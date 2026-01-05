// import { TourDetailModel } from '../models/tour-detail.model';
// import { TourDetailSignalForm } from './tour-detail.signal-form';
//
// export class TourDetailSignalMapper {
//     static fromModel(m: TourDetailModel): TourDetailSignalForm {
//         const f = new TourDetailSignalForm();
//
//         f.tourId.set(m.tourId);
//         f.tourName.set(m.tourName);
//
//         f.fromCountry.set(m.fromCountry);
//         f.fromState.set(m.fromState);
//         f.toCountry.set(m.toCountry);
//         f.toState.set(m.toState);
//
//         f.startDate.set(m.startDate);
//         f.endDate.set(m.endDate);
//
//         f.groupMin.set(m.groupMin);
//         f.groupMax.set(m.groupMax);
//
//         f.description.set(m.description);
//         f.amountText.set(m.amountText);
//
//         f.bannerImages.set(m.bannerImages);
//         f.galleryImages.set(m.galleryImages);
//
//         f.highlights.set(m.highlights);
//         f.itinerary.set(m.itinerary);
//         f.inclusions.set(m.inclusions);
//         f.exclusions.set(m.exclusions);
//         f.preparation.set(m.preparation);
//
//         return f;
//     }
// }