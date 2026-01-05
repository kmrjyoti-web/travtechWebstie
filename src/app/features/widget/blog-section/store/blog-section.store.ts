import { computed, inject, signal } from '@angular/core';
import { BlogSectionRepository } from '../repository/blog-section.repository';
import { BlogSectionVm } from '../models/blog-section.model';

export class BlogSectionStore {
    private readonly repo = inject(BlogSectionRepository);

    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _vm = signal<BlogSectionVm | null>(null);

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
                this._error.set(e?.message ?? 'Failed to load Blog section.');
                this._loading.set(false);
            },
        });
    }
}