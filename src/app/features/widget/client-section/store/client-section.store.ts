import { computed, inject, signal } from '@angular/core';
import { ClientSectionRepository } from '../repository/client-section.repository';
import { ClientSectionVm } from '../models/client-section.model';

export class ClientSectionStore {
    private readonly repo = inject(ClientSectionRepository);

    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _vm = signal<ClientSectionVm | null>(null);

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
                this._error.set(e?.message ?? 'Failed to load client section.');
                this._loading.set(false);
            },
        });
    }
}