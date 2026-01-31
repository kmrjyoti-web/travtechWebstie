// import { computed, inject } from '@angular/core';
// import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
// import { rxMethod } from '@ngrx/signals/rxjs-interop';
// import { pipe, switchMap, tap, catchError, of, Subject } from 'rxjs';
// import { TourDetailModel } from '../models/tour-detail.model';
// import { TourRepository } from '../data-access/repository/tour.repository';
//
// type State = {
//     model: TourDetailModel | null;
//     loading: boolean;
//     error: string | null;
// };
//
// const initialState: State = {
//     model: null,
//     loading: false,
//     error: null,
// };
//
// export const TourDetailStore = signalStore(
//     { providedIn: 'root' },
//     withState(initialState),
//     withHooks({
//         onInit(store) {
//             console.log('TourDetailStore initialized');
//         }
//     }),
//
//     withComputed((s) => {
//         const model = computed(() => s.model());
//
//         return {
//             vm: computed(() => ({
//                 model: s.model(),
//                 loading: s.loading(),
//                 error: s.error(),
//
//                 hasDescription: !!model()?.description?.trim(),
//                 hasHighlights: (model()?.highlights?.length ?? 0) > 0,
//                 hasItinerary: (model()?.itinerary?.length ?? 0) > 0,
//                 hasInclusions: (model()?.inclusions?.length ?? 0) > 0,
//                 hasExclusions: (model()?.exclusions?.length ?? 0) > 0,
//                 hasGallery: (model()?.galleryImages?.length ?? 0) > 0,
//                 hasBanner: (model()?.bannerImages?.length ?? 0) > 0,
//             })),
//         };
//     }),
//
//     withMethods((s) => {
//         const repo = inject(TourRepository);
//
//         return {
//             loadById: rxMethod<string>((tourUniqueId$) =>
//                 tourUniqueId$.pipe(
//                     tap((id) => {
//                         console.log('TourDetailStore loadById called with id:', id);
//                         patchState(s, { loading: true, error: null });
//                     }),
//                     switchMap((tourUniqueId) => {
//                         console.log('TourDetailStore switching to repo.getDetail for:', tourUniqueId);
//                         return repo.getDetail(tourUniqueId).pipe(
//                             tap((model) => {
//                                 console.log('TourDetailStore repo.getDetail success:', model);
//                                 patchState(s, { model, loading: false });
//                             }),
//                             catchError((e) => {
//                                 console.error('TourDetailStore repo.getDetail error:', e);
//                                 patchState(s, { error: String(e.message || e), loading: false });
//                                 return of(null);
//                             })
//                         );
//                     })
//                 )
//             ),
//         };
//     }),
// );

import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap, catchError, of } from 'rxjs';
import { TourDetailModel } from '../models/tour-detail.model';
import { TourRepository } from '../data-access/repository/tour.repository';

type State = {
    model: TourDetailModel | null;
    loading: boolean;
    error: string | null;
};

const initialState: State = {
    model: null,
    loading: false,
    error: null,
};

export const TourDetailStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withHooks({
        onInit() {
            console.log('TourDetailStore initialized');
        },
    }),

    withComputed((s) => {
        const model = computed(() => s.model());
        const doc = computed(() => model()?.doc ?? null);

        return {
            vm: computed(() => ({
                model: s.model(),
                loading: s.loading(),
                error: s.error(),

                doc: doc(),

                hasDoc: !!doc(),
                hasDays: (doc()?.itinerary?.days?.length ?? 0) > 0,
                hasHighlights: (doc()?.attractions?.length ?? 0) > 0,
                hasInclusions: (doc()?.itinerary?.inclusions?.length ?? 0) > 0,
                hasExclusions: (doc()?.itinerary?.exclusions?.length ?? 0) > 0,
                hasDocuments: (doc()?.documentsRequired?.length ?? 0) > 0,
                hasEvents: (doc()?.events?.length ?? 0) > 0,
                hasTransport: (doc()?.transportation?.flights?.length ?? 0) > 0,
                hasHotels: (doc()?.accommodation?.length ?? 0) > 0,
            })),
        };
    }),

    withMethods((s) => {
        const repo = inject(TourRepository);

        return {
            loadById: rxMethod<string>((id$) =>
                id$.pipe(
                    tap(() => patchState(s, { loading: true, error: null })),
                    switchMap((id) =>
                        repo.getDetail(id).pipe(
                            tap((model) => patchState(s, { model, loading: false })),
                            catchError((e) => {
                                patchState(s, { error: String(e?.message ?? e), loading: false });
                                return of(null);
                            })
                        )
                    )
                )
            ),
        };
    })
);