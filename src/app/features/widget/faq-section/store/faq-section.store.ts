import { computed, inject, signal } from '@angular/core';
import { FaqSectionRepository } from '../repository/faq-section.repository';
import { FaqSectionVm } from '../models/faq-section.model';

export class FaqSectionStore {
    private readonly repo = inject(FaqSectionRepository);

    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _vm = signal<FaqSectionVm | null>(null);

    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly vm = computed(() => this._vm());

    load(): void {
        this._loading.set(true);
        this._error.set(null);

        this.repo.getVm().subscribe({
            next: (vm) => {
                // ensure only one open item (bootstrap accordion behavior expects this)
                const firstOpen = vm.items.findIndex(x => x.isOpen);
                const fixed = {
                    ...vm,
                    items: vm.items.map((x, i) => ({ ...x, isOpen: i === firstOpen })),
                };
                this._vm.set(fixed);
                this._loading.set(false);
            },
            error: (e) => {
                this._error.set(e?.message ?? 'Failed to load FAQ section.');
                this._loading.set(false);
            },
        });
    }

    openByIndex(index: number): void {
        const vm = this._vm();
        if (!vm) return;

        this._vm.set({
            ...vm,
            items: vm.items.map((x, i) => ({ ...x, isOpen: i === index })),
        });
    }
}