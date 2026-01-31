import { inject, computed } from '@angular/core';
import { patchState, signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { BenefitSectionRepository } from '../repository/benefit-section.repository';
import { BenefitSectionVm } from '../models/benefit-section.model';
import { BenefitSectionMapper } from '../models/benefit-section.mapper';

type State = {
    loading: boolean;
    error: string | null;
    vm: BenefitSectionVm | null;
};

const initialState: State = {
    loading: false,
    error: null,
    vm: null,
};

export const BenefitSectionStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((state) => ({
        hasData: computed(() => !!state.vm()),
    })),

    withMethods((state) => {
        const repo = inject(BenefitSectionRepository);

        const load = rxMethod<void>((trigger$) =>
            trigger$.pipe(
                tap(() => patchState(state, { loading: true, error: null })),
                switchMap(() =>
                    repo.get().pipe(
                        map((dto) => BenefitSectionMapper.fromDto(dto)),
                        tap((vm) => patchState(state, { vm, loading: false })),
                        catchError((err) => {
                            patchState(state, { loading: false, error: err?.message ?? 'Failed to load benefit section' });
                            return of(null);
                        })
                    )
                )
            )
        );

        return { load };
    })
);