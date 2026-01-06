import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap, catchError, of } from 'rxjs';
import { TourGridItemModel } from '../models/tour-grid.model';
import { TourGridRepository } from '../data-access/repository/tour-grid.repository';

type State = {
    items: TourGridItemModel[];
    loading: boolean;
    error: string | null;
    filterKey: string | null;
};

const initialState: State = {
    items: [],
    loading: false,
    error: null,
    filterKey: null,
};

export const TourGridStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withHooks({
        onInit() {
            console.log('TourGridStore initialized');
        },
    }),

    withComputed((s) => ({
        vm: computed(() => ({
            items: s.items(),
            loading: s.loading(),
            error: s.error(),
            itemCount: s.items().length,
            hasItems: s.items().length > 0
        })),
    })),

    withMethods((s) => {
        const repo = inject(TourGridRepository);

        return {
            loadByFilter: rxMethod<string>((key$) =>
                key$.pipe(
                    tap((key) => patchState(s, { loading: true, error: null, filterKey: key })),
                    switchMap((key) =>
                        repo.getFilteredTours(key).pipe(
                            tap((items) => patchState(s, { items, loading: false })),
                            catchError((e) => {
                                patchState(s, { error: String(e?.message ?? e), loading: false });
                                return of([]);
                            })
                        )
                    )
                )
            ),
        };
    })
);
