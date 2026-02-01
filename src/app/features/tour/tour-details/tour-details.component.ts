import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Title, Meta } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GalleriaModule } from 'primeng/galleria';
import * as L from 'leaflet';

import { TourDetailStore } from '../tour-detail/state/tour-detail.store';
import { VisaInfo } from '../tour-detail/models/tour-detail.model';

type Trip = {
  tripTitle: string;
  summary: string;
  days: TripDay[];
  highlights: Highlight[];
  upcomingEvents: UpcomingEvent[];
  emergencyInfo: EmergencyInfo;
  inclusions: string[];
  exclusions: string[];
  documentsRequired: string[];
  atmospherePoints: string[];
  transportSegments: TransportSegment[];
  accommodationStays: AccommodationStay[];
  matureContent?: string;
  visaInfo?: string;
  weather?: string;
  notes?: string;
  notePoints: string[];
  currencyCode?: string;
  currencySymbol?: string;
  visaInfoDetails?: VisaInfo;

  media?: {
    heroImage?: string;
    activityImages?: { day: number; activity: string; imageUrl: string }[];
  };
  headerImage?: string;
  seo_detail?: {
    title?: string;
    meta_description?: string;
    meta_keywords?: string;
    canonical_url?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
  };
  imageGallery?: string[];
  itineraryImages?: string[];
};

type TripDay = {
  dayNumber: number | string;
  theme: string;
  activities: Activity[];
  nearbySuggestions: string[];
  weather?: {
    forecast?: string;
    dressCode?: string;
  };
};

type Activity = {
  time: string;
  activityName: string;
  description: string;
  category: string;
  latitude?: number;
  longitude?: number;
  location?: string;
  estimatedCost?: string;
};

type Highlight = { name: string; description: string; rating?: string; typicalPrice?: string };
type UpcomingEvent = { title: string; date: string; description: string };
type EmergencyInfo = {
  embassy?: {
    name?: string;
    address?: string;
    phone?: string;
    website?: string;
    details?: string;
  };
  localServices?: {
    police?: string;
    ambulance?: string;
    fire?: string;
    medical?: string;
  };
};

type TransportSegment = {
  id: string;
  type: string;
  operator?: string;
  identifier?: string;
  origin?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  cost?: string;
};

type AccommodationStay = {
  id: string;
  hotelName: string;
  location: string;
  rating?: string;
  pricePerNight?: string;
  totalCost?: string;
  checkIn?: string;
  checkOut?: string;
  facilities?: string[];
  imageUrl?: string;
};

type GalleryItem = { largeUrl: string; thumbUrl: string; alt?: string };
type GalleriaImage = {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt?: string;
  title?: string;
};

@Component({
  selector: 'app-travel-document',
  standalone: true,
  imports: [CommonModule, RouterLink, GalleriaModule],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss',
})
export class TourDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  readonly store = inject(TourDetailStore);
  readonly vm = this.store.vm;

  // ✅ UI state
  readonly trip = signal<Trip | null>(null);
  readonly activeDay = signal<number>(-1);

  // ✅ Gallery state
  readonly galleryItems = signal<GalleryItem[]>([]);

  // ✅ View toggle (Data ↔ Map)
  readonly viewMode = signal<'data' | 'map'>('data');
  readonly selectedMapDay = signal<number>(0); // 0 = All Days

  // ✅ Leaflet map refs
  @ViewChild('itineraryMap') itineraryMap?: ElementRef<HTMLDivElement>;
  private map?: L.Map;
  private markersLayer?: L.LayerGroup;
  private routeLine?: L.Polyline;

  // ✅ Image error protection (prevents “3000 errors” spam)
  private readonly failedUrls = new Set<string>();
  private readonly FALLBACK_IMG =
    `data:image/svg+xml;charset=utf-8,` +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675">
        <rect width="100%" height="100%" fill="#f2f2f2"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
              font-family="Arial" font-size="28" fill="#888">
          Image not available
        </text>
      </svg>
    `);

  constructor() {
    // load by route id
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pm) => {
        const id = pm.get('id') || pm.get('url');
        if (id) this.store.loadById(id);
      });

    // ✅ Fill trip + gallery from vm()
    effect(() => {
      const v = this.vm();
      const doc = (v as any)?.doc ?? (v as any)?.model?.doc;

      if (doc) {
        const normalized: Trip = {
          tripTitle: doc.itinerary?.title ?? doc.tripTitle ?? 'Trip',
          summary: doc.itinerary?.summary ?? doc.summary ?? '',

          currencyCode: doc.currencyCode,
          currencySymbol: doc.currencySymbol,
          matureContent: doc.matureContent,
          visaInfo: typeof doc.visaInfo === 'string' ? doc.visaInfo : doc.visaInfo?.summary,
          visaInfoDetails: typeof doc.visaInfo === 'object' ? doc.visaInfo : undefined,
          weather: doc.itinerary?.weather ?? doc.weather,
          notes: doc.itinerary?.notes ?? doc.notes,
          notePoints: (doc.itinerary?.notes ?? doc.notes ?? '').split('. ').filter((p: string) => p.trim().length > 0).map((p: string) => p.endsWith('.') ? p : p + '.'),

          media: doc.media,

          headerImage: doc.headerImage ?? doc.images?.headerImage,
          seo_detail: {
            title: doc.seo_detail?.title,
            meta_description: doc.seo_detail?.meta_description ?? doc.seo_detail?.metaDescription,
            meta_keywords: Array.isArray(doc.seo_detail?.keywords) ? doc.seo_detail?.keywords.join(', ') : doc.seo_detail?.meta_keywords,
            canonical_url: doc.seo_detail?.canonical_url ?? doc.seo_detail?.canonicalUrl,
            og_title: doc.seo_detail?.og_title ?? doc.seo_detail?.ogTitle,
            og_description: doc.seo_detail?.og_description ?? doc.seo_detail?.ogDescription,
            og_image: doc.seo_detail?.og_image ?? doc.seo_detail?.ogImage,
          },
          imageGallery: (doc.imageGallery ?? doc.images?.gallery?.map((g: any) => g.imageUrl ?? g)) ?? [],
          itineraryImages: (doc.itineraryImages ?? doc.images?.itineraryImages) ?? [],

          days: ((doc.itinerary?.days || doc.days) ?? []).map((d: any) => ({
            ...d,
            dayNumber: Number(d.day || d.dayNumber),
            nearbySuggestions: d.nearbyPlaces?.map((n: any) => n.name) ?? d.nearbySuggestions ?? [],
            activities: (d.activities ?? []).map((a: any) => ({
              ...a,
              activityName: a.title ?? a.activityName ?? '',
              estimatedCost: a.cost?.toString() ?? a.estimatedCost ?? '0',
            })),
            weather: d.weather ? {
              forecast: d.weather.forecast,
              dressCode: d.weather.dressCode,
            } : undefined,
          })),

          highlights: doc.attractions?.map((a: any) => ({
            name: a.name,
            description: a.description,
            rating: a.rating?.toString(),
            typicalPrice: a.cost?.toString()
          })) ?? doc.highlights ?? [],
          upcomingEvents: doc.events?.map((e: any) => ({
            title: e.name,
            date: e.date,
            description: e.description
          })) ?? doc.upcomingEvents ?? [],
          emergencyInfo: doc.emergencyInfo ?? {},

          inclusions: doc.itinerary?.inclusions ?? doc.inclusions ?? [],
          exclusions: doc.itinerary?.exclusions ?? doc.exclusions ?? [],
          documentsRequired: doc.documentsRequired ?? [],
          atmospherePoints: doc.atmospherePoints ?? [],
          transportSegments: doc.transportation?.flights?.map((f: any) => ({
            type: 'Flight',
            operator: f.airline,
            origin: f.departureAirport,
            destination: f.arrivalAirport,
            departureTime: f.departureTime,
            arrivalTime: f.arrivalTime,
            cost: f.price?.toString()
          })) ?? doc.transportSegments ?? [],
          accommodationStays: doc.accommodation?.map((a: any) => ({
            id: a.id,
            hotelName: a.hotelName,
            location: a.address,
            rating: a.rating?.toString(),
            pricePerNight: a.price?.toString(),
            checkIn: a.checkInDate,
            checkOut: a.checkOutDate,
            facilities: a.facilities,
            imageUrl: a.imageQuery
          })) ?? doc.accommodationStays ?? [],
        };

        this.trip.set(normalized);

        // ✅ set default active day once
        const firstDay = normalized.days?.[0]?.dayNumber;
        if (typeof firstDay === 'number' && this.activeDay() === -1) {
          this.activeDay.set(firstDay);
        }

        // ✅ SEO Binding
        if (normalized.seo_detail) {
          if (normalized.seo_detail.title) this.titleService.setTitle(normalized.seo_detail.title);
          if (normalized.seo_detail.meta_description) this.metaService.updateTag({ name: 'description', content: normalized.seo_detail.meta_description });
          if (normalized.seo_detail.meta_keywords) this.metaService.updateTag({ name: 'keywords', content: normalized.seo_detail.meta_keywords });
          if (normalized.seo_detail.og_title) this.metaService.updateTag({ property: 'og:title', content: normalized.seo_detail.og_title });
          if (normalized.seo_detail.og_description) this.metaService.updateTag({ property: 'og:description', content: normalized.seo_detail.og_description });
          if (normalized.seo_detail.og_image) this.metaService.updateTag({ property: 'og:image', content: normalized.seo_detail.og_image });
        }

        // ✅ Gallery Logic: imageGallery > itineraryImages > Hide
        const gal = normalized.imageGallery ?? [];
        const itin = normalized.itineraryImages ?? [];
        const rawImages = (gal.length > 0) ? gal : itin;

        console.log('DEBUG: Normalized Gallery Sources:', {
          gal,
          itin,
          chosen: rawImages
        });


        const finalItems = rawImages.map(item => {
          let url = '';
          if (typeof item === 'string') {
            url = item;
          } else if (typeof item === 'object' && item !== null) {
            // @ts-ignore
            url = item.largeUrl || item.imageUrl || item.url || '';
          }
          return {
            largeUrl: url,
            thumbUrl: url,
            alt: normalized.tripTitle || 'Tour Image'
          };
        });

        const cleaned = finalItems.filter((x) => {
          const l = (x.largeUrl || '').trim();
          const t = (x.thumbUrl || '').trim();
          return l && t && !this.failedUrls.has(l) && !this.failedUrls.has(t);
        });
        this.galleryItems.set(cleaned);
      }

      // ✅ refresh map if open
      if (this.viewMode() === 'map') {
        queueMicrotask(() => this.renderMap());
      }
    });
  }

  // ----------------------------
  // ✅ Gallery (PrimeNG Galleria)
  // ----------------------------
  readonly galleryImages = computed<GalleriaImage[]>(() => {
    const items = this.galleryItems() ?? [];
    return items
      .map((x) => ({
        itemImageSrc: x.largeUrl,
        thumbnailImageSrc: x.thumbUrl || x.largeUrl,
        alt: x.alt ?? '',
        title: x.alt ?? '',
      }))
      .filter((x) => !!x.itemImageSrc);
  });

  // ✅ Fix spam: fallback never fails + remove broken urls so galleria stops recreating them
  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (!img) return;

    // do not re-handle same element
    if (img.dataset['errHandled'] === '1') return;
    img.dataset['errHandled'] = '1';

    const badUrl = (img.currentSrc || img.src || '').trim();
    if (badUrl) this.failedUrls.add(badUrl);

    // safe fallback (never 404)
    img.src = this.FALLBACK_IMG;

    // remove failed urls from the gallery state (prevents endless new <img> creation)
    const cleaned = (this.galleryItems() ?? []).filter((x) => {
      const l = (x.largeUrl || '').trim();
      const t = (x.thumbUrl || '').trim();
      return !this.failedUrls.has(l) && !this.failedUrls.has(t);
    });

    if (cleaned.length !== this.galleryItems().length) {
      this.galleryItems.set(cleaned);
    }
  }

  private normalizeBannerImages(banners: any): GalleryItem[] {
    if (!Array.isArray(banners)) return [];

    const items = banners
      .map((b: any) => {
        const large = String(b?.largeUrl ?? b?.imageUrl ?? b?.url ?? '').trim();
        const thumb = String(b?.thumbUrl ?? b?.thumbnailUrl ?? large ?? '').trim();
        const alt = String(b?.alt ?? b?.title ?? '').trim();
        return { largeUrl: large, thumbUrl: thumb, alt };
      })
      .filter((x: GalleryItem) => !!x.largeUrl && !!x.thumbUrl);

    return this.uniqueByUrl(items);
  }

  private buildGalleryFallback(t: Trip | null): GalleryItem[] {
    if (!t) return [];

    const items: GalleryItem[] = [];

    if (t.media?.heroImage) {
      const url = String(t.media.heroImage).trim();
      if (url) items.push({ largeUrl: url, thumbUrl: url, alt: t.tripTitle });
    }

    for (const ai of t.media?.activityImages ?? []) {
      const url = String(ai?.imageUrl ?? '').trim();
      if (!url) continue;
      items.push({
        largeUrl: url,
        thumbUrl: url,
        alt: `Day ${ai.day}: ${ai.activity}`,
      });
    }

    for (const h of t.accommodationStays ?? []) {
      const url = String(h?.imageUrl ?? '').trim();
      if (!url) continue;
      items.push({
        largeUrl: url,
        thumbUrl: url,
        alt: h.hotelName ?? 'Hotel',
      });
    }

    return this.uniqueByUrl(items);
  }

  private uniqueByUrl(items: GalleryItem[]): GalleryItem[] {
    const map = new Map<string, GalleryItem>();
    for (const it of items) {
      const key = String(it.largeUrl ?? '').trim();
      if (key) map.set(key, it);
    }
    return [...map.values()];
  }

  // ----------------------------
  // ✅ Toggle (Data ↔ Map)
  // ----------------------------
  setViewMode(mode: 'data' | 'map') {
    this.viewMode.set(mode);

    if (mode === 'map') {
      // wait until DOM renders the map container
      setTimeout(() => {
        this.initMap();     // will recreate if needed
        this.renderMap();
      }, 0);
    }
  }
  private destroyMap() {
    this.routeLine?.remove();
    this.routeLine = undefined;

    this.markersLayer?.clearLayers();
    this.markersLayer = undefined;

    this.map?.remove();      // ✅ important
    this.map = undefined;
  }

  setMapDay(day: number) {
    this.selectedMapDay.set(day);
    queueMicrotask(() => this.renderMap());
  }

  // ----------------------------
  // ✅ Leaflet Map
  // ----------------------------
  private initMap() {
    const el = this.itineraryMap?.nativeElement;
    if (!el) return;

    // ✅ if map exists but container was destroyed, recreate
    if (this.map && this.map.getContainer() !== el) {
      this.destroyMap();
    }
    if (this.map) return;

    (L.Icon.Default as any).mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });

    this.map = L.map(el, { zoomControl: true, scrollWheelZoom: false })
      .setView([19.076, 72.8777], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);

    // ✅ Leaflet needs this when coming from hidden tab/view
    setTimeout(() => this.map?.invalidateSize(), 50);
  }

  private getMapPoints() {
    const t = this.trip();
    if (!t) return [];

    const day = this.selectedMapDay();
    const days = day === 0 ? t.days ?? [] : (t.days ?? []).filter((x) => Number(x.dayNumber) === day);

    const pts = days.flatMap((d) =>
      (d.activities ?? [])
        .filter((a) => typeof a.latitude === 'number' && typeof a.longitude === 'number')
        .map((a) => ({
          day: Number(d.dayNumber),
          time: a.time ?? '',
          name: a.activityName ?? '',
          loc: a.location ?? '',
          lat: a.latitude as number,
          lng: a.longitude as number,
        }))
    );

    pts.sort((a, b) => (a.day - b.day) || a.time.localeCompare(b.time));
    return pts;
  }

  renderMap() {
    this.initMap();
    if (!this.map || !this.markersLayer) return;

    this.markersLayer.clearLayers();
    this.routeLine?.remove();

    const pts = this.getMapPoints();
    if (!pts.length) {
      this.map.setView([19.076, 72.8777], 11);
      setTimeout(() => this.map?.invalidateSize(), 50);
      return;
    }

    const latlngs: L.LatLngExpression[] = [];

    for (const p of pts) {
      const ll: L.LatLngExpression = [p.lat, p.lng];
      latlngs.push(ll);

      L.marker(ll)
        .addTo(this.markersLayer)
        .bindPopup(`<b>Day ${p.day}</b> • ${p.time}<br/><b>${p.name}</b><br/>${p.loc}`);
    }

    this.routeLine = L.polyline(latlngs).addTo(this.map);
    this.map.fitBounds(L.latLngBounds(latlngs as any), { padding: [20, 20] });

    setTimeout(() => this.map?.invalidateSize(), 80);
  }

  // ----------------------------
  // ✅ Existing helpers
  // ----------------------------
  headerImage = computed(() => this.trip()?.headerImage);
  durationDays = computed(() => this.trip()?.days?.length ?? 0);

  firstGeo = computed(() => {
    const t = this.trip();
    if (!t) return { lat: 19.076, lng: 72.8777 };

    for (const d of t.days ?? []) {
      for (const a of d.activities ?? []) {
        if (typeof a.latitude === 'number' && typeof a.longitude === 'number') {
          return { lat: a.latitude, lng: a.longitude };
        }
      }
    }
    return { lat: 19.076, lng: 72.8777 };
  });

  mapUrl = computed<SafeResourceUrl>(() => {
    const { lat, lng } = this.firstGeo();
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`);
  });

  estActivityCostTotal = computed(() => {
    const t = this.trip();
    if (!t) return 0;

    let sum = 0;
    for (const d of t.days ?? []) {
      for (const a of d.activities ?? []) {
        const v = Number(a.estimatedCost ?? 0);
        if (!Number.isNaN(v)) sum += v;
      }
    }
    return sum;
  });

  estHotelTotal = computed(() => {
    const t = this.trip();
    if (!t) return 0;

    const v = Number(t.accommodationStays?.[0]?.totalCost ?? 0);
    return Number.isNaN(v) ? 0 : v;
  });

  estGrandTotal = computed(() => this.estActivityCostTotal() + this.estHotelTotal());

  asPreLine(text?: string): string {
    return (text ?? '').trim();
  }

  toggleDay(dayNumber: number | string): void {
    const day = Number(dayNumber);
    if (Number.isNaN(day)) return;
    this.activeDay.set(this.activeDay() === day ? -1 : day);
  }

  // ----------------------------
  // ✅ PDF Generation
  // ----------------------------
  isGeneratingPdf = signal(false);

  async generatePDF() {
    if (this.isGeneratingPdf()) return;
    this.isGeneratingPdf.set(true);

    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      // 1. Capture the content element
      const content = document.querySelector('.content') as HTMLElement;
      if (!content) throw new Error('Content element not found');

      // 2. Clone the content
      const clone = content.cloneNode(true) as HTMLElement;

      // Style the clone
      clone.style.width = '1200px';
      clone.style.position = 'absolute';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.zIndex = '-1';
      clone.style.background = '#ffffff';
      document.body.appendChild(clone);

      // --- MODIFY CLONE CONTENT ---

      // A. Expand all accordions
      const collapses = clone.querySelectorAll('.collapse');
      collapses.forEach((el: any) => {
        el.classList.add('show');
        el.style.display = 'block';
      });
      const buttons = clone.querySelectorAll('.accordion-button');
      buttons.forEach((el: any) => {
        el.classList.remove('collapsed');
        el.setAttribute('aria-expanded', 'true');
      });

      // B. Remove unwanted elements
      const allButtons = clone.querySelectorAll('button');
      allButtons.forEach((b: any) => {
        if (b.textContent?.includes('Download')) b.remove();
        // Remove map view toggles if present
        if (b.textContent?.includes('Map View') || b.textContent?.includes('Data View')) {
          b.closest('.btn-group')?.remove();
        }
      });

      const hiddenElements = clone.querySelectorAll('.pdf-hidden');
      hiddenElements.forEach((el: any) => el.remove());

      // C. Handle Gallery (First 2 images only)
      const galleryContainer = clone.querySelector('p-galleria')?.parentElement;
      if (galleryContainer) {
        // Clear existing gallery
        galleryContainer.innerHTML = '';

        // Add first 2 images properly styled
        const images = this.galleryImages().slice(0, 2);
        if (images.length > 0) {
          const grid = document.createElement('div');
          grid.style.display = 'grid';
          grid.style.gridTemplateColumns = '1fr 1fr';
          grid.style.gap = '10px';
          grid.style.marginBottom = '20px';

          images.forEach(img => {
            const imgEl = document.createElement('img');
            imgEl.src = img.itemImageSrc as string;
            imgEl.style.width = '100%';
            imgEl.style.height = '300px';
            imgEl.style.objectFit = 'cover';
            imgEl.style.borderRadius = '8px';
            grid.appendChild(imgEl);
          });
          galleryContainer.appendChild(grid);
        }
      }

      // D. Full Width Layout
      const col8 = clone.querySelector('.col-xl-8');
      const col4 = clone.querySelector('.col-xl-4');
      if (col8) {
        col8.classList.remove('col-xl-8');
        col8.classList.add('col-12');
      }
      if (col4) {
        col4.classList.remove('col-xl-4');
        col4.classList.add('col-12');
        // Move sidebar content to specific location if needed, or just let it stack
      }

      // E. Manual Page Break Logic
      // A4 ratio is ~1.414. If width is 1200px, height is ~1697px
      const PAGE_HEIGHT = 1697;

      // Wait for any potential reflows
      await new Promise(resolve => setTimeout(resolve, 100));

      // Elements we want to keep together
      const breakableElements = clone.querySelectorAll('.travel-hero, .bg-light-200, .card, .accordion-item');

      let currentYOffset = 0;
      const cloneRect = clone.getBoundingClientRect();
      const cloneTop = cloneRect.top;

      breakableElements.forEach((el: any) => {
        const rect = el.getBoundingClientRect();

        // Calculate current top relative to clone top, + any offsets we added recursively
        const elTop = (rect.top - cloneTop) + currentYOffset;
        const elHeight = rect.height;
        const elBottom = elTop + elHeight;

        const topPage = Math.floor(elTop / PAGE_HEIGHT);
        const bottomPage = Math.floor(elBottom / PAGE_HEIGHT);

        // If crosses page boundary and fits on one page
        if (topPage !== bottomPage && elHeight < PAGE_HEIGHT) {
          const nextPageStart = (topPage + 1) * PAGE_HEIGHT;
          const marginNeeded = nextPageStart - elTop + 20;

          el.style.marginTop = `${marginNeeded}px`;
          currentYOffset += marginNeeded;
        }
      });

      const elementsToCheck = Array.from(clone.querySelectorAll('.card, .bg-light-200'));
      // Sort by Y position
      // We need to append to body to check rects? It is already appended.

      // Force a layout calc?
      // clone.getBoundingClientRect(); 

      // Let's rely on standard flow. We'll verify walkthrough manually.

      // 5. Generate Canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200
      });

      // 6. Create PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const title = this.trip()?.tripTitle || 'travel-document';
      pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);

      document.body.removeChild(clone);

    } catch (err) {
      console.error('PDF Generation failed', err);
    } finally {
      this.isGeneratingPdf.set(false);
    }
  }
}