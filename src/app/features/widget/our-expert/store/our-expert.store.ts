import { computed, inject, signal } from '@angular/core';
import { OurExpertRepository } from '../repository/our-expert.repository';
import { OurExpertVm } from '../models/our-expert.model';

export class OurExpertStore {
    private readonly repo = inject(OurExpertRepository);

    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _vm = signal<OurExpertVm | null>(null);

    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly vm = computed(() => this._vm());

    load(): void {
        this._loading.set(true);
        this._error.set(null);

        this.repo.getVm().subscribe({
            next: (vm) => {
                this._vm.set(vm);
                this._loading.set(false);
            },
            error: (e) => {
                this._error.set(e?.message ?? 'Failed to load experts.');
                this._loading.set(false);
            },
        });
    }
}