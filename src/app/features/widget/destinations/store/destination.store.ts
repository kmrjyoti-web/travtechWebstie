import { inject, computed } from '@angular/core';
import { patchState, signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { DestinationRepository } from '../repository/destination.repository';
import { DestinationCard } from '../models/destination.model';
import { DestinationMapper } from '../models/destination.mapper';

type State = {
    loading: boolean;
    error: string | null;
    cards: DestinationCard[];
};

const initialState: State = {
    loading: false,
    error: null,
    cards: [],
};

export const DestinationStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((state) => ({
        hasData: computed(() => state.cards().length > 0),
    })),

    withMethods((state) => {
        const repo = inject(DestinationRepository);

        const load = rxMethod<void>((trigger$) =>
            trigger$.pipe(
                tap(() => patchState(state, { loading: true, error: null })),
                switchMap(() =>
                    repo.getAll().pipe(
                        map((dtos) => (dtos ?? []).map(DestinationMapper.fromDto)),
                        tap((cards) => patchState(state, { cards, loading: false })),
                        catchError((err) => {
                            patchState(state, {
                                loading: false,
                                error: err?.message ?? 'Failed to load destinations',
                            });
                            return of([] as DestinationCard[]);
                        })
                    )
                )
            )
        );

        return { load };
    })
);