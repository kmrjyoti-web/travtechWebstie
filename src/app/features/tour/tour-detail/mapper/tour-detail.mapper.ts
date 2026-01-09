// import {
//     TourDetailModel,
//     TourImage,
//     TourHighlight,
//     TourItinerary,
//     TourListItem
// } from '../models/tour-detail.model';
// import { TourDetailDto } from '../dto/tour-detail.dto';
// import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';
//
// export class TourDetailMapper {
//     static fromDto(dto: TourDetailDto): TourDetailModel {
//         const bannerImages = this.parseImages(dto.package_image, 'PKG_BANNER');
//         const galleryImages = this.parseImages(dto.package_image, 'PACKAGE_GALERY');
//
//         const highlights = this.parseHighlights(dto.package_highlights);
//         const itinerary = this.parseItinerary(dto.package_itinerary_detail);
//
//         const inclusions = this.parseList(dto.package_inclusions_detail, 'tour_incisions_index', 'tour_incisions_index_detail');
//         const exclusions = this.parseList(dto.package_exclusions_detail, 'tour_exclusions_index', 'tour_exclusions_index_detail');
//         const preparation = this.parseList(dto.package_advance_preparation_detail, 'tour_preparation_index', 'tour_preparation_index_detail');
//
//         return {
//             tourId: dto.package_id,
//             tourName: dto.package_name ?? '',
//
//             toCountry: dto.to_country ?? '',
//             toState: dto.to_state ?? '',
//             fromCountry: dto.from_country ?? '',
//             fromState: dto.from_state ?? '',
//
//             startDate: this.toDate(dto.package_start_date),
//             endDate: this.toDate(dto.package_end_date),
//
//             groupMin: dto.package_group_size_min ?? null,
//             groupMax: dto.package_group_size_max ?? null,
//
//             description: (dto.package_description ?? '').trim(),
//
//             amountText: (dto.package_amount ?? '').trim() || null,
//
//             bannerImages,
//             galleryImages,
//
//             highlights,
//             itinerary,
//
//             inclusions,
//             exclusions,
//             preparation,
//         };
//     }
//
//     private static toDate(v: string | null | undefined): Date | null {
//         if (!v) return null;
//         const d = new Date(v);
//         return isNaN(d.getTime()) ? null : d;
//     }
//
//     private static safeJson<T>(raw: string | null | undefined, fallback: T): T {
//         try {
//             if (!raw) return fallback;
//             return JSON.parse(raw) as T;
//         } catch {
//             return fallback;
//         }
//     }
//
//     private static parseImages(raw: string | null, key: 'PKG_BANNER' | 'PACKAGE_GALERY'): TourImage[] {
//         type ImgRow = {
//             larger_Url?: string;
//             SMALL_300_Url?: string;
//             SMALL_200_Url?: string;
//             position?: number;
//         };
//         type ImgJson = {
//             PKG_BANNER?: ImgRow[];
//             PACKAGE_GALERY?: ImgRow[];
//         };
//
//         const json = this.safeJson<ImgJson>(raw, {});
//         const rows = (json?.[key] ?? []).slice();
//
//         return rows
//             .map((r, idx) => ({
//                 largeUrl: prefixDocApiUrl(r.larger_Url || r.SMALL_300_Url || r.SMALL_200_Url || ''),
//                 thumbUrl: prefixDocApiUrl(r.SMALL_300_Url || r.SMALL_200_Url || r.larger_Url || ''),
//                 position: r.position ?? (idx + 1),
//             }))
//             .filter(x => !!x.largeUrl);
//     }
//
//     private static parseHighlights(raw: string | null): TourHighlight[] {
//         type Row = { highlight_index: number; highlights_detail: string };
//         const rows = this.safeJson<Row[]>(raw, []);
//         return rows
//             .map(r => ({ index: r.highlight_index ?? 0, detail: (r.highlights_detail ?? '').trim() }))
//             .filter(x => !!x.detail)
//             .sort((a, b) => a.index - b.index);
//     }
//
//     private static parseItinerary(raw: string | null): TourItinerary[] {
//         type Row = {
//             itinerary_index: number;
//             itinerary_day: string;
//             itinerary_heading: string;
//             itinerary_detail: string;
//             itinerary_start_date: string | null;
//         };
//         const rows = this.safeJson<Row[]>(raw, []);
//         return rows
//             .map(r => ({
//                 index: r.itinerary_index ?? 0,
//                 day: (r.itinerary_day ?? '').toString(),
//                 heading: (r.itinerary_heading ?? '').trim(),
//                 detail: (r.itinerary_detail ?? '').trim(),
//                 startDate: this.toDate(r.itinerary_start_date),
//             }))
//             .filter(x => !!x.heading || !!x.detail)
//             .sort((a, b) => a.index - b.index);
//     }
//
//     private static parseList(
//         raw: string | null,
//         idxKey: string,
//         detailKey: string
//     ): TourListItem[] {
//         const rows = this.safeJson<any[]>(raw, []);
//         return rows
//             .map(r => ({
//                 index: Number(r?.[idxKey] ?? 0),
//                 detail: String(r?.[detailKey] ?? '').trim(),
//             }))
//             .filter(x => !!x.detail)
//             .sort((a, b) => a.index - b.index);
//     }
// }


import { TourDetailDto } from '../dto/tour-detail.dto';
import { PackageJsonConfig, TourDetailModel } from '../models/tour-detail.model';

export class TourDetailMapper {
    static fromDto(dto: TourDetailDto): TourDetailModel {
        const doc = this.parsePackageJsonConfig(dto.itineraries_detail || dto.package_json_config);

        return {
            tourId: dto.package_id,
            tourName: dto.package_name ?? '',

            doc,

            fromCountry: dto.from_country ?? doc?.fromLocation?.country ?? '',
            fromState: dto.from_state ?? doc?.fromLocation?.state ?? '',
            toCountry: dto.to_country ?? doc?.toLocation?.country ?? '',
            toState: dto.to_state ?? doc?.toLocation?.state ?? '',

            startDate: this.toDate(dto.package_start_date),
            endDate: this.toDate(dto.package_end_date),
        };
    }

    private static toDate(v: string | null | undefined): Date | null {
        if (!v) return null;
        const d = new Date(v);
        return isNaN(d.getTime()) ? null : d;
    }

    private static safeJson<T>(raw: string | null | undefined, fallback: T): T {
        try {
            if (!raw) return fallback;
            return JSON.parse(raw) as T;
        } catch {
            return fallback;
        }
    }

    private static parsePackageJsonConfig(raw: string | null): PackageJsonConfig | null {
        const parsed = this.safeJson<any>(raw, null);
        const first = Array.isArray(parsed) ? parsed?.[0] : parsed;
        if (!first) return null;

        return {
            preferences: first.preferences,
            visaInfo: first.visaInfo ? {
                summary: first.visaInfo.summary ?? '',
                sources: (first.visaInfo.sources ?? []).map((s: any) => ({
                    title: s.title ?? '',
                    uri: s.uri ?? '',
                })),
                processSteps: (first.visaInfo.processSteps ?? []).map((p: any) => ({
                    step: p.step ?? 0,
                    title: p.title ?? '',
                    description: p.description ?? '',
                    documents: p.documents ?? [],
                    duration: p.duration ?? '',
                })),
            } : undefined,
            itinerary: first.itinerary ? {
                title: first.itinerary.title ?? '',
                summary: first.itinerary.summary ?? '',
                weather: first.itinerary.weather ?? '',
                notes: first.itinerary.notes ?? '',
                days: (first.itinerary.days ?? []).map((d: any) => ({
                    day: d.day ?? 0,
                    theme: d.theme ?? '',
                    accommodationId: d.accommodationId ?? '',
                    weather: d.weather ? {
                        forecast: d.weather.forecast ?? '',
                        dressCode: d.weather.dressCode ?? '',
                    } : undefined,
                    activities: (d.activities ?? []).map((a: any) => ({
                        time: a.time ?? '',
                        title: a.title ?? '',
                        description: a.description ?? '',
                        location: a.location ?? '',
                        activityType: a.activityType ?? '',
                        latitude: a.latitude,
                        longitude: a.longitude,
                        cost: a.cost,
                        completed: !!a.completed,
                    })),
                    nearbyPlaces: (d.nearbyPlaces ?? []).map((n: any) => ({
                        name: n.name ?? '',
                        description: n.description ?? '',
                        imageQuery: n.imageQuery ?? '',
                        estimatedCost: n.estimatedCost ?? '',
                        latitude: n.latitude,
                        longitude: n.longitude,
                        category: n.category ?? '',
                        cost: n.cost,
                        estimatedDuration: n.estimatedDuration ?? '',
                        rating: n.rating,
                    })),
                })),
                inclusions: first.itinerary.inclusions ?? [],
                exclusions: first.itinerary.exclusions ?? [],
            } : undefined,
            accommodation: (first.accommodation ?? []).map((a: any) => ({
                id: a.id ?? '',
                type: a.type ?? '',
                hotelName: a.hotelName ?? '',
                checkInDate: a.checkInDate ?? '',
                checkOutDate: a.checkOutDate ?? '',
                price: a.price,
                facilities: a.facilities ?? [],
                imageQuery: a.imageQuery ?? '',
                address: a.address ?? '',
                boardBasis: a.boardBasis ?? '',
                contactNumber: a.contactNumber ?? '',
                rating: a.rating,
                roomType: a.roomType ?? '',
                website: a.website ?? '',
            })),
            transportation: first.transportation ? {
                flights: (first.transportation.flights ?? []).map((f: any) => ({
                    airline: f.airline ?? '',
                    departureAirport: f.departureAirport ?? '',
                    arrivalAirport: f.arrivalAirport ?? '',
                    departureTime: f.departureTime ?? '',
                    arrivalTime: f.arrivalTime ?? '',
                    price: f.price,
                })),
                other: (first.transportation.other ?? []).map((o: any) => ({
                    type: o.type ?? '',
                    details: o.details ?? '',
                    price: o.price,
                })),
                trains: (first.transportation.trains ?? []).map((t: any) => ({
                    trainType: t.trainType ?? '',
                    departureStation: t.departureStation ?? '',
                    arrivalStation: t.arrivalStation ?? '',
                    departureTime: t.departureTime ?? '',
                    arrivalTime: t.arrivalTime ?? '',
                    price: t.price,
                })),
            } : undefined,
            attractions: (first.attractions ?? []).map((a: any) => ({
                name: a.name ?? '',
                description: a.description ?? '',
                imageQuery: a.imageQuery ?? '',
                estimatedCost: a.estimatedCost ?? '',
                latitude: a.latitude,
                longitude: a.longitude,
                category: a.category ?? '',
                cost: a.cost,
                estimatedDuration: a.estimatedDuration ?? '',
                rating: a.rating,
            })),
            events: (first.events ?? []).map((e: any) => ({
                name: e.name ?? '',
                date: e.date ?? '',
                description: e.description ?? '',
                venue: e.venue ?? '',
                cost: e.cost,
                latitude: e.latitude,
                longitude: e.longitude,
            })),
            emergencyInfo: first.emergencyInfo ? {
                embassy: first.emergencyInfo.embassy ? {
                    name: first.emergencyInfo.embassy.name ?? '',
                    address: first.emergencyInfo.embassy.address ?? '',
                    phone: first.emergencyInfo.embassy.phone ?? '',
                    website: first.emergencyInfo.embassy.website ?? '',
                    details: first.emergencyInfo.embassy.details ?? '',
                } : undefined,
                localServices: first.emergencyInfo.localServices ? {
                    police: first.emergencyInfo.localServices.police ?? '',
                    ambulance: first.emergencyInfo.localServices.ambulance ?? '',
                    fire: first.emergencyInfo.localServices.fire ?? '',
                    medical: first.emergencyInfo.localServices.medical ?? '',
                } : undefined,
            } : undefined,
            documentsRequired: first.documentsRequired ?? [],
            atmospherePoints: first.atmospherePoints ?? [],
            configVersion: first.configVersion,
            mapping: first.mapping,
            fromLocation: first.fromLocation,
            toLocation: first.toLocation,
            
            // ✅ Pass through missing fields
            images: first.images,
            headerImage: first.headerImage,
            imageGallery: first.imageGallery,
            itineraryImages: first.itineraryImages,
            seo_detail: first.seo_detail,
        };
    }
}