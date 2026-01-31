import { inject, computed } from '@angular/core';
import { patchState, signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { PreferencesCardRepository } from '../repository/preferences-card.repository';
import { PreferencesCardVm } from '../models/preferences-card.model';
import { PreferencesCardMapper } from '../models/preferences-card.mapper';

type State = {
    loading: boolean;
    error: string | null;
    cards: PreferencesCardVm[];
};

const initialState: State = {
    loading: false,
    error: null,
    cards: [],
};

export const PreferencesCardStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((state) => ({
        hasData: computed(() => state.cards().length > 0),
    })),

    withMethods((state) => {
        const repo = inject(PreferencesCardRepository);

        const load = rxMethod<void>((trigger$) =>
            trigger$.pipe(
                tap(() => patchState(state, { loading: true, error: null })),
                switchMap(() =>
                    repo.getAll().pipe(
                        map((dtos) => (dtos ?? []).map(PreferencesCardMapper.fromDto)),
                        tap((cards) => patchState(state, { cards, loading: false })),
                        catchError((err) => {
                            patchState(state, {
                                loading: false,
                                error: err?.message ?? 'Failed to load preferences',
                            });
                            return of([] as PreferencesCardVm[]);
                        })
                    )
                )
            )
        );

        return { load };
    })
);