// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   DestroyRef,
//   computed,
//   effect,
//   inject,
//   signal,
// } from '@angular/core';
// import {ActivatedRoute, RouterLink} from '@angular/router';
// import { DomSanitizer, SafeResourceUrl, Title, Meta } from '@angular/platform-browser';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
// import { TourDetailStore } from '../tour-detail/state/tour-detail.store';
// import {distinctUntilChanged, filter, map, merge, startWith} from "rxjs"; // ✅ change path if needed
//
// // Keep your type if you want strict typing.
// // If your store returns PackageJsonConfig, you can replace Trip with that model.
// type Trip = any;
//
// @Component({
//   selector: 'app-travel-document',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './tour-details.component.html',
//   styleUrl: './tour-details.component.scss',
// })
// export class TourDetailsComponent {
//   private readonly route = inject(ActivatedRoute);
//   private readonly destroyRef = inject(DestroyRef);
//   private readonly sanitizer = inject(DomSanitizer);
//   private readonly store = inject(TourDetailStore);

//
//   // ✅ Template uses: @let t = trip();
//   // Try multiple common fields from store.vm()
//   readonly trip = computed<Trip | null>(() => {
//     const vm: any = this.store.vm();
//
//     // preferred (if you made vm.doc in store)
//     if (vm?.doc) return vm.doc;
//
//     // if store has parsed config attached to model
//     if (vm?.model?.packageJsonConfig) return vm.model.packageJsonConfig;
//
//     // sometimes it’s already on model
//     if (vm?.model?.doc) return vm.model.doc;
//
//     // fallback: if your store exposes parsed JSON differently
//     if (vm?.travelDoc) return vm.travelDoc;
//
//     return null;
//   });
//
//   // UI state (accordion)
//   readonly activeDay = signal<number>(1);
//
//   constructor() {
//     // ✅ One stream handles: initial load + param changes + query changes
//     merge(this.route.paramMap, this.route.queryParamMap)
//         .pipe(
//             startWith(null), // ✅ triggers initial load once
//             map(() => this.readIdFromAnySource()),
//             filter((id): id is string => !!id),
//             distinctUntilChanged(), // ✅ avoids calling API twice for same id
//             takeUntilDestroyed(this.destroyRef)
//         )
//         .subscribe((id) => {
//           this.store.loadById(id);
//         });
//
//     // ✅ set default active day when trip arrives
//     effect(() => {
//       const t = this.trip();
//       const firstDay = t?.days?.[0]?.dayNumber;
//       const day = Number(firstDay);
//
//       // Only set if activeDay is not set yet or if we want to reset on new trip
//       // We check if activeDay is -1 (all closed) or if it's a different trip logic
//       // But to avoid overriding user interaction, we might want to be careful.
//       // For now, let's keep it but ensure it doesn't loop.
//       // We can use untracked to check current value if needed, but here we want to react to trip change.
//
//       if (!Number.isNaN(day) && this.activeDay() === 1 && t) {
//          // This logic might be resetting it. Let's just ensure we have a valid day.
//          // If the user clicked to close (activeDay = -1), this effect might re-open it if trip() re-emits.
//          // However, trip() is a computed, so it should be stable.
//       }
//     });
//   }
//
//   private readIdFromAnySource(): string | null {
//     const keys = ['tour_unique_id', 'tourUniqueId', 'TourUniqueId', 'tourId', 'id', 'package_id'];
//
//     // paramMap
//     for (const k of keys) {
//       const v = this.route.snapshot.paramMap.get(k);
//       if (v) return v;
//     }
//
//     // parent paramMap (child routes)
//     for (const k of keys) {
//       const v = this.route.parent?.snapshot.paramMap.get(k);
//       if (v) return v ?? null;
//     }
//
//     // query params
//     for (const k of keys) {
//       const v = this.route.snapshot.queryParamMap.get(k);
//       if (v) return v;
//     }
//
//     // last resort: last URL segment
//     const parts = window.location.pathname.split('/').filter(Boolean);
//     const last = parts[parts.length - 1];
//     if (last && !['travel-document', 'tour-details', 'details'].includes(last)) return last;
//
//     return null;
//   }
//
//   // ---------- Helpers used in template ----------
//   durationDays = computed(() => this.trip()?.days?.length ?? 0);
//
//   toggleDay(dayNumber: number | string): void {
//     const day = Number(dayNumber);
//     if (Number.isNaN(day)) return;
//
//     this.activeDay.update(current => current === day ? -1 : day);
//   }
//
//   asPreLine(text?: string): string {
//     return (text ?? '').toString();
//   }
//
//   // ---------- Money parsing (safe for "₹12,000" / "$ 1,200.50") ----------
//   private money(v: any): number {
//     if (v == null) return 0;
//     const n = Number(String(v).replace(/[^\d.]/g, ''));
//     return Number.isFinite(n) ? n : 0;
//   }
//
//   estActivityCostTotal = computed(() => {
//     const t = this.trip();
//     if (!t?.days?.length) return 0;
//
//     let sum = 0;
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         sum += this.money(a?.estimatedCost);
//       }
//     }
//     return Math.round(sum);
//   });
//
//   estHotelTotal = computed(() => {
//     const t = this.trip();
//     if (!t?.accommodationStays?.length) return 0;
//
//     let sum = 0;
//     for (const s of t.accommodationStays ?? []) {
//       const totalCost = this.money(s?.totalCost);
//       if (totalCost > 0) sum += totalCost;
//       else sum += this.money(s?.pricePerNight); // fallback
//     }
//     return Math.round(sum);
//   });
//
//   estGrandTotal = computed(() => Math.round(this.estActivityCostTotal() + this.estHotelTotal()));
//
//   // ---------- Map ----------
//   private firstGeo = computed(() => {
//     const t = this.trip();
//     for (const d of t?.days ?? []) {
//       for (const a of d?.activities ?? []) {
//         if (typeof a?.latitude === 'number' && typeof a?.longitude === 'number') {
//           return { lat: a.latitude, lng: a.longitude };
//         }
//       }
//     }
//     return { lat: 19.076, lng: 72.8777 }; // fallback Mumbai
//   });
//
//   mapUrl = computed<SafeResourceUrl>(() => {
//     const { lat, lng } = this.firstGeo();
//     return this.sanitizer.bypassSecurityTrustResourceUrl(
//         `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`
//     );
//   });
//
//   // ---------- Optional: for local testing without API ----------
//   setTripFromArray(trips: Trip[]): void {
//     // if your JSON is an array, you can temporarily patch store-like behavior:
//     // (but normally store should set it)
//     (this.store as any).patchLocalDoc?.(trips?.[0] ?? null);
//   }
// }

//
// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   DestroyRef,
//   computed,
//   effect,
//   inject,
//   signal,
// } from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
// import { LightgalleryModule } from 'lightgallery/angular';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';
//
// // ✅ use your actual repo/service/store here
// import { TourDetailStore } from '../tour-detail/state/tour-detail.store';
//
// type Trip = {
//   tripTitle: string;
//   summary: string;
//   days: TripDay[];
//   highlights: Highlight[];
//   upcomingEvents: UpcomingEvent[];
//   emergencyInfo: EmergencyInfo;
//   inclusions: string[];
//   exclusions: string[];
//   documentsRequired: string[];
//   atmospherePoints: string[];
//   transportSegments: TransportSegment[];
//   accommodationStays: AccommodationStay[];
//   matureContent?: string;
//   visaInfo?: string;
//   weather?: string;
//   currencyCode?: string;
//   currencySymbol?: string;
// };
//
// type TripDay = {
//   dayNumber: number | string;
//   theme: string;
//   activities: Activity[];
//   nearbySuggestions: string[];
// };
//
// type Activity = {
//   time: string;
//   activityName: string;
//   description: string;
//   category: string;
//   latitude?: number;
//   longitude?: number;
//   location?: string;
//   estimatedCost?: string;
// };
//
// type Highlight = { name: string; description: string; rating?: string; typicalPrice?: string; };
// type UpcomingEvent = { title: string; date: string; description: string; };
// type EmergencyInfo = { embassyContact: string; localEmergencyNumbers: string; hospitalRecommendation: string; };
// type TransportSegment = { id: string; type: string; operator?: string; identifier?: string; origin?: string; destination?: string; departureTime?: string; arrivalTime?: string; cost?: string; };
// type AccommodationStay = { id: string; hotelName: string; location: string; rating?: string; pricePerNight?: string; totalCost?: string; checkIn?: string; checkOut?: string; facilities?: string[]; imageUrl?: string; };
//
// @Component({
//   selector: 'app-travel-document',
//   standalone: true,
//   imports: [CommonModule, RouterLink, LightgalleryModule],
//   templateUrl: './tour-details.component.html',
//   styleUrl: './tour-details.component.scss',
// })
// export class TourDetailsComponent {
//   private readonly route = inject(ActivatedRoute);
//   private readonly destroyRef = inject(DestroyRef);
//   private readonly sanitizer = inject(DomSanitizer);
//
//   // ✅ if you already use a store for package details
//   readonly store = inject(TourDetailStore);
//
//   // Gallery
//   gallerySettings = {
//     counter: false,
//     plugins: [lgZoom, lgVideo],
//     download: true,
//   };
//
//   // UI state
//   // UI state
//   readonly trip = signal<Trip | null>(null);
//   readonly activeDay = signal<number>(-1);
//   readonly activeIndex = signal<number>(0);
//   readonly galleryItems = signal<{ largeUrl: string; thumbUrl: string }[]>([]);
//   readonly thumbItems = signal<{ largeUrl: string; thumbUrl: string }[]>([]);
//   readonly showSlider = computed(() => this.galleryItems().length > 0);
//   readonly vm = this.store.vm; // ✅ so template vm() works
//   constructor() {
//     // ✅ load by route id: /tour-details/:id
//     this.route.paramMap
//       .pipe(takeUntilDestroyed(this.destroyRef))
//       .subscribe((pm) => {
//         const id = pm.get('id');
//         if (id) this.store.loadById(id);
//       });
//
//     // ✅ when store gets data, parse package_json_config and set trip()
//     // effect(() => {
//     //   const model: any = this.store.vm().model; // adjust if your store uses different shape
//     //   const pkg = model?.data ?? model;         // depends on how you store API response
//     //
//     //   const jsonStr = pkg?.package_json_config;
//     //   if (!jsonStr) return;
//     //
//     //   const parsed = this.safeJsonParse<any>(jsonStr);
//     //   if (!parsed) return;
//     //
//     //   // normalize dayNumber to NUMBER so accordion works
//     //   const normalized: Trip = {
//     //     tripTitle: parsed.tripTitle ?? pkg?.package_name ?? 'Trip',
//     //     summary: parsed.summary ?? '',
//     //     currencyCode: parsed.currencyCode,
//     //     currencySymbol: parsed.currencySymbol,
//     //
//     //     matureContent: parsed.matureContent,
//     //     visaInfo: parsed.visaInfo,
//     //     weather: parsed.weather,
//     //
//     //     days: (parsed.days ?? []).map((d: any) => ({
//     //       ...d,
//     //       dayNumber: Number(d.dayNumber), // ✅ important
//     //       nearbySuggestions: d.nearbySuggestions ?? [],
//     //       activities: (d.activities ?? []).map((a: any) => ({
//     //         ...a,
//     //         estimatedCost: a.estimatedCost ?? '0',
//     //       })),
//     //     })),
//     //
//     //     highlights: parsed.highlights ?? [],
//     //     upcomingEvents: parsed.upcomingEvents ?? [],
//     //     emergencyInfo: parsed.emergencyInfo ?? { embassyContact: '', localEmergencyNumbers: '', hospitalRecommendation: '' },
//     //     inclusions: parsed.inclusions ?? [],
//     //     exclusions: parsed.exclusions ?? [],
//     //     documentsRequired: parsed.documentsRequired ?? [],
//     //     atmospherePoints: parsed.atmospherePoints ?? [],
//     //     transportSegments: parsed.transportSegments ?? [],
//     //     accommodationStays: parsed.accommodationStays ?? [],
//     //   };
//     //
//     //   // ✅ Parse Images
//     //   if (pkg.package_image) {
//     //     const imgParsed = this.safeJsonParse<any>(pkg.package_image);
//     //     if (imgParsed?.PKG_BANNER) {
//     //       const images = imgParsed.PKG_BANNER.map((img: any) => ({
//     //         largeUrl: img.larger_Url || img.larger_rpath,
//     //         thumbUrl: img.SMALL_200_Url || img.SMALL_200_rpath
//     //       }));
//     //       this.galleryItems.set(images);
//     //       this.thumbItems.set(images);
//     //     }
//     //   }
//     //
//     //   this.trip.set(normalized);
//     //
//     //   // ✅ set default active day
//     //   const firstDay = normalized.days?.[0]?.dayNumber;
//     //   if (typeof firstDay === 'number' && this.activeDay() !== firstDay) {
//     //     this.activeDay.set(firstDay);
//     //   }
//     // });
//
//
//   }
//
//   private safeJsonParse<T>(value: any): T | null {
//     try {
//       if (!value) return null;
//       if (typeof value === 'object') return value as T;
//       return JSON.parse(String(value)) as T;
//     } catch {
//       return null;
//     }
//   }
//
//   // ---------- helpers ----------
//   openGallery(index: number): void {
//     this.activeIndex.set(index);
//     // Logic to open lightgallery if needed, or simply let the loop handle it
//   }
//
//   durationDays = computed(() => (this.trip()?.days?.length ?? 0));
//
//   firstGeo = computed(() => {
//     const t = this.trip();
//     if (!t) return { lat: 19.076, lng: 72.8777 };
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         if (typeof a.latitude === 'number' && typeof a.longitude === 'number') {
//           return { lat: a.latitude, lng: a.longitude };
//         }
//       }
//     }
//     return { lat: 19.076, lng: 72.8777 };
//   });
//
//   mapUrl = computed<SafeResourceUrl>(() => {
//     const { lat, lng } = this.firstGeo();
//     return this.sanitizer.bypassSecurityTrustResourceUrl(
//       `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`
//     );
//   });
//
//   estActivityCostTotal = computed(() => {
//     const t = this.trip();
//     if (!t) return 0;
//     let sum = 0;
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         const v = Number(a.estimatedCost ?? 0);
//         if (!Number.isNaN(v)) sum += v;
//       }
//     }
//     return sum;
//   });
//
//   estHotelTotal = computed(() => {
//     const t = this.trip();
//     if (!t) return 0;
//     const v = Number(t.accommodationStays?.[0]?.totalCost ?? 0);
//     return Number.isNaN(v) ? 0 : v;
//   });
//
//   estGrandTotal = computed(() => this.estActivityCostTotal() + this.estHotelTotal());
//
//   asPreLine(text?: string): string {
//     return (text ?? '').trim();
//   }
//
//   toggleDay(dayNumber: number | string): void {
//     const day = Number(dayNumber);
//     if (Number.isNaN(day)) return;
//     this.activeDay.set(this.activeDay() === day ? -1 : day);
//   }
// }

// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   DestroyRef,
//   computed,
//   effect,
//   inject,
//   signal,
// } from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
// import { LightgalleryModule } from 'lightgallery/angular';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';
//
// import { TourDetailStore } from '../tour-detail/state/tour-detail.store';
//
// type Trip = {
//   tripTitle: string;
//   summary: string;
//   days: TripDay[];
//   highlights: Highlight[];
//   upcomingEvents: UpcomingEvent[];
//   emergencyInfo: EmergencyInfo;
//   inclusions: string[];
//   exclusions: string[];
//   documentsRequired: string[];
//   atmospherePoints: string[];
//   transportSegments: TransportSegment[];
//   accommodationStays: AccommodationStay[];
//   matureContent?: string;
//   visaInfo?: string;
//   weather?: string;
//   currencyCode?: string;
//   currencySymbol?: string;
// };
//
// type TripDay = {
//   dayNumber: number | string;
//   theme: string;
//   activities: Activity[];
//   nearbySuggestions: string[];
// };
//
// type Activity = {
//   time: string;
//   activityName: string;
//   description: string;
//   category: string;
//   latitude?: number;
//   longitude?: number;
//   location?: string;
//   estimatedCost?: string;
// };
//
// type Highlight = { name: string; description: string; rating?: string; typicalPrice?: string };
// type UpcomingEvent = { title: string; date: string; description: string };
// type EmergencyInfo = { embassyContact: string; localEmergencyNumbers: string; hospitalRecommendation: string };
// type TransportSegment = { id: string; type: string; operator?: string; identifier?: string; origin?: string; destination?: string; departureTime?: string; arrivalTime?: string; cost?: string };
// type AccommodationStay = { id: string; hotelName: string; location: string; rating?: string; pricePerNight?: string; totalCost?: string; checkIn?: string; checkOut?: string; facilities?: string[]; imageUrl?: string };
//
// @Component({
//   selector: 'app-travel-document',
//   standalone: true,
//   imports: [CommonModule, RouterLink, LightgalleryModule],
//   templateUrl: './tour-details.component.html',
//   styleUrl: './tour-details.component.scss',
// })
// export class TourDetailsComponent {
//   private readonly route = inject(ActivatedRoute);
//   private readonly destroyRef = inject(DestroyRef);
//   private readonly sanitizer = inject(DomSanitizer);
//
//   readonly store = inject(TourDetailStore);
//   readonly vm = this.store.vm; // template can use vm()
//
//   gallerySettings = {
//     counter: false,
//     plugins: [lgZoom, lgVideo],
//     download: true,
//   };
//
//   // ✅ UI state
//   readonly trip = signal<Trip | null>(null);
//   readonly activeDay = signal<number>(-1);
//   readonly activeIndex = signal<number>(0);
//
//   readonly galleryItems = signal<{ largeUrl: string; thumbUrl: string }[]>([]);
//   readonly thumbItems = signal<{ largeUrl: string; thumbUrl: string }[]>([]);
//   readonly showSlider = computed(() => this.galleryItems().length > 0);
//
//   constructor() {
//     // load by route id
//     this.route.paramMap
//         .pipe(takeUntilDestroyed(this.destroyRef))
//         .subscribe((pm) => {
//           const id = pm.get('id');
//           if (id) this.store.loadById(id);
//         });
//
//     // ✅ Fill trip + gallery from vm()
//     effect(() => {
//       const v = this.vm();
//
//       // 1) ✅ doc already exists in vm (your json shows vm.doc)
//       const doc = (v as any)?.doc ?? (v as any)?.model?.doc;
//       if (doc) {
//         const normalized: Trip = {
//           tripTitle: doc.tripTitle ?? 'Trip',
//           summary: doc.summary ?? '',
//
//           currencyCode: doc.currencyCode,
//           currencySymbol: doc.currencySymbol,
//           matureContent: doc.matureContent,
//           visaInfo: doc.visaInfo,
//           weather: doc.weather,
//
//           days: (doc.days ?? []).map((d: any) => ({
//             ...d,
//             dayNumber: Number(d.dayNumber), // ✅ important for toggle
//             nearbySuggestions: d.nearbySuggestions ?? [],
//             activities: (d.activities ?? []).map((a: any) => ({
//               ...a,
//               estimatedCost: a.estimatedCost ?? '0',
//             })),
//           })),
//
//           highlights: doc.highlights ?? [],
//           upcomingEvents: doc.upcomingEvents ?? [],
//           emergencyInfo: doc.emergencyInfo ?? {
//             embassyContact: '',
//             localEmergencyNumbers: '',
//             hospitalRecommendation: '',
//           },
//
//           inclusions: doc.inclusions ?? [],
//           exclusions: doc.exclusions ?? [],
//           documentsRequired: doc.documentsRequired ?? [],
//           atmospherePoints: doc.atmospherePoints ?? [],
//           transportSegments: doc.transportSegments ?? [],
//           accommodationStays: doc.accommodationStays ?? [],
//         };
//
//         this.trip.set(normalized);
//
//         // ✅ set default active day once
//         const firstDay = normalized.days?.[0]?.dayNumber;
//         if (typeof firstDay === 'number' && this.activeDay() === -1) {
//           this.activeDay.set(firstDay);
//         }
//       }
//
//       // 2) ✅ Banner Images (your json shows vm.model.bannerImages)
//       const banners = (v as any)?.model?.bannerImages ?? [];
//       if (Array.isArray(banners) && banners.length) {
//         const images = banners.map((b: any) => ({
//           largeUrl: b.largeUrl,
//           thumbUrl: b.thumbUrl,
//         }));
//         this.galleryItems.set(images);
//         this.thumbItems.set(images);
//       }
//     });
//   }
//
//   private safeJsonParse<T>(value: any): T | null {
//     try {
//       if (!value) return null;
//       if (typeof value === 'object') return value as T;
//       return JSON.parse(String(value)) as T;
//     } catch {
//       return null;
//     }
//   }
//
//   openGallery(index: number): void {
//     this.activeIndex.set(index);
//   }
//
//   durationDays = computed(() => (this.trip()?.days?.length ?? 0));
//
//   firstGeo = computed(() => {
//     const t = this.trip();
//     if (!t) return { lat: 19.076, lng: 72.8777 };
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         if (typeof a.latitude === 'number' && typeof a.longitude === 'number') {
//           return { lat: a.latitude, lng: a.longitude };
//         }
//       }
//     }
//     return { lat: 19.076, lng: 72.8777 };
//   });
//
//   mapUrl = computed<SafeResourceUrl>(() => {
//     const { lat, lng } = this.firstGeo();
//     return this.sanitizer.bypassSecurityTrustResourceUrl(
//         `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`
//     );
//   });
//
//   estActivityCostTotal = computed(() => {
//     const t = this.trip();
//     if (!t) return 0;
//     let sum = 0;
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         const v = Number(a.estimatedCost ?? 0);
//         if (!Number.isNaN(v)) sum += v;
//       }
//     }
//     return sum;
//   });
//
//   estHotelTotal = computed(() => {
//     const t = this.trip();
//     if (!t) return 0;
//     const v = Number(t.accommodationStays?.[0]?.totalCost ?? 0);
//     return Number.isNaN(v) ? 0 : v;
//   });
//
//   estGrandTotal = computed(() => this.estActivityCostTotal() + this.estHotelTotal());
//
//   asPreLine(text?: string): string {
//     return (text ?? '').trim();
//   }
//
//   toggleDay(dayNumber: number | string): void {
//     const day = Number(dayNumber);
//     if (Number.isNaN(day)) return;
//     this.activeDay.set(this.activeDay() === day ? -1 : day);
//   }
// }
//
// import { CommonModule } from '@angular/common';
// import {
//   AfterViewInit,
//   Component,
//   DestroyRef,
//   ElementRef,
//   ViewChild,
//   computed,
//   effect,
//   inject,
//   signal,
// } from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
// import { LightgalleryModule } from 'lightgallery/angular';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';
//
// import * as L from 'leaflet';
//
// import { TourDetailStore } from '../tour-detail/state/tour-detail.store';
// import {GalleriaModule} from "primeng/galleria";
//
// type Trip = {
//   tripTitle: string;
//   summary: string;
//   days: TripDay[];
//   highlights: Highlight[];
//   upcomingEvents: UpcomingEvent[];
//   emergencyInfo: EmergencyInfo;
//   inclusions: string[];
//   exclusions: string[];
//   documentsRequired: string[];
//   atmospherePoints: string[];
//   transportSegments: TransportSegment[];
//   accommodationStays: AccommodationStay[];
//   matureContent?: string;
//   visaInfo?: string;
//   weather?: string;
//   currencyCode?: string;
//   currencySymbol?: string;
//
//   // optional media
//   media?: {
//     heroImage?: string;
//     activityImages?: { day: number; activity: string; imageUrl: string }[];
//   };
// };
//
// type TripDay = {
//   dayNumber: number | string;
//   theme: string;
//   activities: Activity[];
//   nearbySuggestions: string[];
// };
//
// type Activity = {
//   time: string;
//   activityName: string;
//   description: string;
//   category: string;
//   latitude?: number;
//   longitude?: number;
//   location?: string;
//   estimatedCost?: string;
// };
//
// type Highlight = { name: string; description: string; rating?: string; typicalPrice?: string };
// type UpcomingEvent = { title: string; date: string; description: string };
// type EmergencyInfo = { embassyContact: string; localEmergencyNumbers: string; hospitalRecommendation: string };
// type TransportSegment = { id: string; type: string; operator?: string; identifier?: string; origin?: string; destination?: string; departureTime?: string; arrivalTime?: string; cost?: string };
// type AccommodationStay = { id: string; hotelName: string; location: string; rating?: string; pricePerNight?: string; totalCost?: string; checkIn?: string; checkOut?: string; facilities?: string[]; imageUrl?: string };
// type GalleriaImage = {
//   itemImageSrc: string;
//   thumbnailImageSrc: string;
//   alt?: string;
//   title?: string;
// };
// @Component({
//   selector: 'app-travel-document',
//   standalone: true,
//   imports: [CommonModule, RouterLink, LightgalleryModule, GalleriaModule],
//   templateUrl: './tour-details.component.html',
//   styleUrl: './tour-details.component.scss',
// })
// export class TourDetailsComponent implements AfterViewInit {
//   private readonly route = inject(ActivatedRoute);
//   private readonly destroyRef = inject(DestroyRef);
//   private readonly sanitizer = inject(DomSanitizer);
//
//   readonly store = inject(TourDetailStore);
//   readonly vm = this.store.vm; // template can use vm()
//
//   gallerySettings = {
//     counter: false,
//     plugins: [lgZoom, lgVideo],
//     download: true,
//   };
//
//   // ✅ UI state
//   readonly trip = signal<Trip | null>(null);
//   readonly activeDay = signal<number>(-1);
//   readonly activeIndex = signal<number>(0);
//
//   // ✅ Gallery items for your template
//   readonly galleryItems = signal<{ largeUrl: string; thumbUrl: string; alt?: string }[]>([]);
//   readonly thumbItems = signal<{ largeUrl: string; thumbUrl: string; alt?: string }[]>([]);
//   readonly showSlider = computed(() => this.galleryItems().length > 0);
//
//   // ✅ NEW: View toggle (Data ↔ Map)
//   readonly viewMode = signal<'data' | 'map'>('data');
//   readonly selectedMapDay = signal<number>(0); // 0 = All Days
//
//   // ✅ NEW: Leaflet map
//   @ViewChild('itineraryMap') itineraryMap?: ElementRef<HTMLDivElement>;
//   private map?: L.Map;
//   private markersLayer?: L.LayerGroup;
//   private routeLine?: L.Polyline;
//
//   constructor() {
//     // load by route id
//     this.route.paramMap
//         .pipe(takeUntilDestroyed(this.destroyRef))
//         .subscribe((pm) => {
//           const id = pm.get('id');
//           if (id) this.store.loadById(id);
//         });
//
//     // ✅ Fill trip + gallery from vm()
//     effect(() => {
//       const v = this.vm();
//
//       // 1) ✅ doc already exists in vm (your json shows vm.doc)
//       const doc = (v as any)?.doc ?? (v as any)?.model?.doc;
//       if (doc) {
//         const normalized: Trip = {
//           tripTitle: doc.tripTitle ?? 'Trip',
//           summary: doc.summary ?? '',
//
//           currencyCode: doc.currencyCode,
//           currencySymbol: doc.currencySymbol,
//           matureContent: doc.matureContent,
//           visaInfo: doc.visaInfo,
//           weather: doc.weather,
//
//           media: doc.media,
//
//           days: (doc.days ?? []).map((d: any) => ({
//             ...d,
//             dayNumber: Number(d.dayNumber),
//             nearbySuggestions: d.nearbySuggestions ?? [],
//             activities: (d.activities ?? []).map((a: any) => ({
//               ...a,
//               estimatedCost: a.estimatedCost ?? '0',
//             })),
//           })),
//
//           highlights: doc.highlights ?? [],
//           upcomingEvents: doc.upcomingEvents ?? [],
//           emergencyInfo: doc.emergencyInfo ?? {
//             embassyContact: '',
//             localEmergencyNumbers: '',
//             hospitalRecommendation: '',
//           },
//
//           inclusions: doc.inclusions ?? [],
//           exclusions: doc.exclusions ?? [],
//           documentsRequired: doc.documentsRequired ?? [],
//           atmospherePoints: doc.atmospherePoints ?? [],
//           transportSegments: doc.transportSegments ?? [],
//           accommodationStays: doc.accommodationStays ?? [],
//         };
//
//         this.trip.set(normalized);
//
//         // ✅ set default active day once
//         const firstDay = normalized.days?.[0]?.dayNumber;
//         if (typeof firstDay === 'number' && this.activeDay() === -1) {
//           this.activeDay.set(firstDay);
//         }
//       }
//
//       // 2) ✅ Banner Images (your json shows vm.model.bannerImages)
//       const banners = (v as any)?.model?.bannerImages ?? [];
//       const bannerImages = Array.isArray(banners)
//           ? banners
//               .map((b: any) => ({
//                 largeUrl: String(b?.largeUrl ?? '').trim(),
//                 thumbUrl: String(b?.thumbUrl ?? b?.largeUrl ?? '').trim(),
//                 alt: String(b?.alt ?? '').trim(),
//               }))
//               .filter((x: any) => !!x.largeUrl && !!x.thumbUrl)
//           : [];
//
//       // ✅ Fallback: build gallery from doc.media + accommodation if banners missing
//       if (bannerImages.length) {
//         this.galleryItems.set(bannerImages);
//         this.thumbItems.set(bannerImages);
//       } else {
//         const t = this.trip();
//         const fallback = this.buildGalleryFallback(t);
//         this.galleryItems.set(fallback);
//         this.thumbItems.set(fallback);
//       }
//
//       // ✅ if map view is open, refresh map after trip updates
//       if (this.viewMode() === 'map') {
//         queueMicrotask(() => this.renderMap());
//       }
//     });
//   }
//
//   ngAfterViewInit(): void {
//     // no-op (map is created only when map view is opened)
//   }
//
//   // ----------------------------
//   // ✅ Gallery helpers
//   // ----------------------------
//   private buildGalleryFallback(t: Trip | null): { largeUrl: string; thumbUrl: string; alt?: string }[] {
//     if (!t) return [];
//
//     const items: { largeUrl: string; thumbUrl: string; alt?: string }[] = [];
//
//     if (t.media?.heroImage) {
//       items.push({ largeUrl: t.media.heroImage, thumbUrl: t.media.heroImage, alt: t.tripTitle });
//     }
//
//     for (const ai of (t.media?.activityImages ?? [])) {
//       if (ai?.imageUrl) {
//         items.push({
//           largeUrl: ai.imageUrl,
//           thumbUrl: ai.imageUrl,
//           alt: `Day ${ai.day}: ${ai.activity}`,
//         });
//       }
//     }
//
//     for (const a of (t.accommodationStays ?? [])) {
//       if (a?.imageUrl) {
//         items.push({
//           largeUrl: a.imageUrl,
//           thumbUrl: a.imageUrl,
//           alt: a.hotelName ?? 'Hotel',
//         });
//       }
//     }
//
//     // unique by URL
//     const uniq = new Map<string, { largeUrl: string; thumbUrl: string; alt?: string }>();
//     for (const i of items) {
//       const k = (i.largeUrl ?? '').trim();
//       if (k) uniq.set(k, i);
//     }
//
//     return [...uniq.values()];
//   }
//
//   // openGallery(index: number): void {
//   //   this.activeIndex.set(index);
//   // }
//   readonly galleryImages = computed<GalleriaImage[]>(() => {
//     const items = this.galleryItems() ?? [];
//     return items
//         .map((x) => ({
//           itemImageSrc: x.largeUrl,
//           thumbnailImageSrc: x.thumbUrl ?? x.largeUrl,
//           alt: x.alt ?? '',
//           title: x.alt ?? '',
//         }))
//         .filter((x) => !!x.itemImageSrc);
//   });
//
//   onImgError(ev: Event) {
//     const img = ev.target as HTMLImageElement | null;
//     if (!img) return;
//
//     // ✅ avoid infinite loop
//     img.onerror = null;
//
//     // fallback image (put any placeholder you have)
//     img.src = 'assets/img/placeholder/placeholder-16x9.jpg';
//   }
//   // ----------------------------
//   // ✅ Toggle (Data ↔ Map)
//   // ----------------------------
//   setViewMode(mode: 'data' | 'map') {
//     this.viewMode.set(mode);
//
//     if (mode === 'map') {
//       queueMicrotask(() => this.renderMap());
//     }
//   }
//
//   setMapDay(day: number) {
//     this.selectedMapDay.set(day);
//     queueMicrotask(() => this.renderMap());
//   }
//
//   // ----------------------------
//   // ✅ Map (Leaflet) logic
//   // ----------------------------
//   private initMap() {
//     if (this.map) return;
//
//     const el = this.itineraryMap?.nativeElement;
//     if (!el) return;
//
//     // ✅ Fix default icon issue in Leaflet (Vite/Angular)
//     const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
//     const iconUrl = 'assets/leaflet/marker-icon.png';
//     const shadowUrl = 'assets/leaflet/marker-shadow.png';
//
//     (L.Icon.Default as any).mergeOptions({
//       iconRetinaUrl,
//       iconUrl,
//       shadowUrl,
//     });
//
//     this.map = L.map(el, {
//       zoomControl: true,
//       scrollWheelZoom: false,
//     }).setView([19.0760, 72.8777], 11);
//
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap',
//     }).addTo(this.map);
//
//     this.markersLayer = L.layerGroup().addTo(this.map);
//   }
//
//   private getMapPoints() {
//     const t = this.trip();
//     if (!t) return [];
//
//     const day = this.selectedMapDay();
//     const days = day === 0 ? (t.days ?? []) : (t.days ?? []).filter(x => Number(x.dayNumber) === day);
//
//     const pts = days.flatMap(d =>
//         (d.activities ?? [])
//             .filter(a => typeof a.latitude === 'number' && typeof a.longitude === 'number')
//             .map(a => ({
//               day: Number(d.dayNumber),
//               time: a.time,
//               name: a.activityName,
//               loc: a.location,
//               lat: a.latitude as number,
//               lng: a.longitude as number,
//             }))
//     );
//
//     // optional: sort by day then time
//     pts.sort((a, b) => (a.day - b.day) || (a.time ?? '').localeCompare(b.time ?? ''));
//     return pts;
//   }
//
//   renderMap() {
//     this.initMap();
//     if (!this.map || !this.markersLayer) return;
//
//     this.markersLayer.clearLayers();
//     this.routeLine?.remove();
//
//     const pts = this.getMapPoints();
//     if (!pts.length) {
//       // no points – keep map at Mumbai
//       this.map.setView([19.0760, 72.8777], 11);
//       setTimeout(() => this.map?.invalidateSize(), 50);
//       return;
//     }
//
//     const latlngs: L.LatLngExpression[] = [];
//
//     for (const p of pts) {
//       const ll: L.LatLngExpression = [p.lat, p.lng];
//       latlngs.push(ll);
//
//       L.marker(ll)
//           .addTo(this.markersLayer)
//           .bindPopup(
//               `<b>Day ${p.day}</b> • ${p.time}<br/><b>${p.name}</b><br/>${p.loc ?? ''}`
//           );
//     }
//
//     this.routeLine = L.polyline(latlngs).addTo(this.map);
//     this.map.fitBounds(L.latLngBounds(latlngs as any), { padding: [20, 20] });
//
//     // ✅ important when map container was hidden before
//     setTimeout(() => this.map?.invalidateSize(), 80);
//   }
//
//   // ----------------------------
//   // ✅ Existing computed helpers (unchanged)
//   // ----------------------------
//   durationDays = computed(() => (this.trip()?.days?.length ?? 0));
//
//   firstGeo = computed(() => {
//     const t = this.trip();
//     if (!t) return { lat: 19.076, lng: 72.8777 };
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         if (typeof a.latitude === 'number' && typeof a.longitude === 'number') {
//           return { lat: a.latitude, lng: a.longitude };
//         }
//       }
//     }
//     return { lat: 19.076, lng: 72.8777 };
//   });
//
//   mapUrl = computed<SafeResourceUrl>(() => {
//     const { lat, lng } = this.firstGeo();
//     return this.sanitizer.bypassSecurityTrustResourceUrl(
//         `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`
//     );
//   });
//
//   estActivityCostTotal = computed(() => {
//     const t = this.trip();
//     if (!t) return 0;
//     let sum = 0;
//     for (const d of t.days ?? []) {
//       for (const a of d.activities ?? []) {
//         const v = Number(a.estimatedCost ?? 0);
//         if (!Number.isNaN(v)) sum += v;
//       }
//     }
//     return sum;
//   });
//
//   estHotelTotal = computed(() => {
//     const t = this.trip();
//     if (!t) return 0;
//     const v = Number(t.accommodationStays?.[0]?.totalCost ?? 0);
//     return Number.isNaN(v) ? 0 : v;
//   });
//
//   estGrandTotal = computed(() => this.estActivityCostTotal() + this.estHotelTotal());
//
//   asPreLine(text?: string): string {
//     return (text ?? '').trim();
//   }
//
//   toggleDay(dayNumber: number | string): void {
//     const day = Number(dayNumber);
//     if (Number.isNaN(day)) return;
//     this.activeDay.set(this.activeDay() === day ? -1 : day);
//   }
// }
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
}