import { computed, inject, signal } from '@angular/core';
import { UpdateSectionRepository } from '../repository/update-section.repository';
import { UpdateSectionVm } from '../models/update-section.model';

export class UpdateSectionStore {
    private readonly repo = inject(UpdateSectionRepository);

    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _vm = signal<UpdateSectionVm | null>(null);

    // form state
    private readonly _email = signal('');

    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly vm = computed(() => this._vm());
    readonly email = this._email.asReadonly();

    load(): void {
        this._loading.set(true);
        this._error.set(null);

        this.repo.getVm().subscribe({
            next: (vm) => {
                this._vm.set(vm);
                this._loading.set(false);
            },
            error: (e) => {
                this._error.set(e?.message ?? 'Failed to load update section.');
                this._loading.set(false);
            },
        });
    }

    setEmail(v: string): void {
        this._email.set(v ?? '');
    }

    submit(): void {
        const email = this._email().trim();

        if (!email) {
            this._error.set('Please enter email address.');
            return;
        }

        // You can replace this with real API call later
        this._error.set(null);
        // reset
        this._email.set('');
    }
}