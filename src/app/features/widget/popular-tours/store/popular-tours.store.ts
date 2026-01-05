import { inject, computed } from '@angular/core';
import { patchState, signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { PopularToursRepository } from '../repository/popular-tours.repository';
import { PopularToursVm } from '../models/popular-tours.model';
import { PopularToursMapper } from '../models/popular-tours.mapper';

type State = {
    loading: boolean;
    error: string | null;
    vm: PopularToursVm | null;
};

const initialState: State = {
    loading: false,
    error: null,
    vm: null,
};

export const PopularToursStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((state) => ({
        hasData: computed(() => !!state.vm()),
    })),

    withMethods((state) => {
        const repo = inject(PopularToursRepository);

        const load = rxMethod<void>((trigger$) =>
            trigger$.pipe(
                tap(() => patchState(state, { loading: true, error: null })),
                switchMap(() =>
                    repo.get().pipe(
                        map((dto) => PopularToursMapper.fromDto(dto)),
                        tap((vm) => patchState(state, { vm, loading: false })),
                        catchError((err) => {
                            patchState(state, { loading: false, error: err?.message ?? 'Failed to load popular tours' });
                            return of(null);
                        })
                    )
                )
            )
        );

        return { load };
    })
);