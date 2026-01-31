import { inject, computed } from '@angular/core';
import { patchState, signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { BenefitSection2Repository } from '../repository/benefit-section-2.repository';
import { BenefitSection2Vm } from '../models/benefit-section-2.model';
import { BenefitSection2Mapper } from '../models/benefit-section-2.mapper';

type State = {
    loading: boolean;
    error: string | null;
    vm: BenefitSection2Vm | null;
};

const initialState: State = {
    loading: false,
    error: null,
    vm: null,
};

export const BenefitSection2Store = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((state) => ({
        hasData: computed(() => !!state.vm()),
    })),

    withMethods((state) => {
        const repo = inject(BenefitSection2Repository);

        const load = rxMethod<void>((trigger$) =>
            trigger$.pipe(
                tap(() => patchState(state, { loading: true, error: null })),
                switchMap(() =>
                    repo.get().pipe(
                        map((dto) => BenefitSection2Mapper.fromDto(dto)),
                        tap((vm) => patchState(state, { vm, loading: false })),
                        catchError((err) => {
                            patchState(state, { loading: false, error: err?.message ?? 'Failed to load benefits' });
                            return of(null);
                        })
                    )
                )
            )
        );

        return { load };
    })
);