// import { signal } from '@angular/core';
// import { TourDetailModel } from '../models/tour-detail.model';
//
// export class TourDetailSignalForm {
//     tourId = signal<string>('');
//
//     tourName = signal<string>('');
//     fromCountry = signal<string>('');
//     fromState = signal<string>('');
//     toCountry = signal<string>('');
//     toState = signal<string>('');
//
//     startDate = signal<Date | null>(null);
//     endDate = signal<Date | null>(null);
//
//     groupMin = signal<number | null>(null);
//     groupMax = signal<number | null>(null);
//
//     description = signal<string>('');
//     amountText = signal<string | null>(null);
//
//     bannerImages = signal<TourDetailModel['bannerImages']>([]);
//     galleryImages = signal<TourDetailModel['galleryImages']>([]);
//
//     highlights = signal<TourDetailModel['highlights']>([]);
//     itinerary = signal<TourDetailModel['itinerary']>([]);
//     inclusions = signal<TourDetailModel['inclusions']>([]);
//     exclusions = signal<TourDetailModel['exclusions']>([]);
//     preparation = signal<TourDetailModel['preparation']>([]);
// }