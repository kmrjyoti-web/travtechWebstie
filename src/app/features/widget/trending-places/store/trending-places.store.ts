import { inject, computed } from '@angular/core';
import { patchState, signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { TrendingPlacesRepository } from '../repository/trending-places.repository';
import { TrendingPlacesVm } from '../models/trending-places.model';
import { TrendingPlacesMapper } from '../models/trending-places.mapper';

type State = {
    loading: boolean;
    error: string | null;
    vm: TrendingPlacesVm | null;
    activeTabKey: string;
    favIds: Record<string, true>;
};

const initialState: State = {
    loading: false,
    error: null,
    vm: null,
    activeTabKey: 'hotel',
    favIds: {},
};

export const TrendingPlacesStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((state) => ({
        header: computed(() => state.vm()?.header ?? null),
        tabs: computed(() => state.vm()?.tabs ?? []),
        activeTab: computed(() => state.activeTabKey()),
        // helpers
        isFav: computed(() => (id: string) => !!state.favIds()[id]),
    })),

    withMethods((state) => {
        const repo = inject(TrendingPlacesRepository);

        const load = rxMethod<void>((t$) =>
            t$.pipe(
                tap(() => patchState(state, { loading: true, error: null })),
                switchMap(() =>
                    repo.get().pipe(
                        map((dto) => TrendingPlacesMapper.fromDto(dto)),
                        tap((vm) => patchState(state, { vm, loading: false, activeTabKey: vm.activeTabKey })),
                        catchError((err) => {
                            patchState(state, { loading: false, error: err?.message ?? 'Failed to load trending places' });
                            return of(null);
                        })
                    )
                )
            )
        );

        const setActiveTab = (key: string) => patchState(state, { activeTabKey: key });

        const toggleFav = (id: string) => {
            const curr = { ...state.favIds() };
            if (curr[id]) delete curr[id];
            else curr[id] = true;
            patchState(state, { favIds: curr });
        };

        return { load, setActiveTab, toggleFav };
    })
);