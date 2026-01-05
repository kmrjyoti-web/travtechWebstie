import { Injectable, computed, signal } from '@angular/core';
import { FooterRepository } from '../repository/footer.repository';
import { FooterData } from '../models/footer.model';

@Injectable({ providedIn: 'root' })
export class FooterStore {
    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _data = signal<FooterData | null>(null);

    readonly loading = computed(() => this._loading());
    readonly error = computed(() => this._error());
    readonly data = computed(() => this._data());

    constructor(private readonly repo: FooterRepository) {}

    load(): void {
        if (this._data()) return; // cache
        this._loading.set(true);
        this._error.set(null);

        this.repo.get().subscribe({
            next: (res) => {
                this._data.set(res);
                this._loading.set(false);
            },
            error: (err) => {
                this._error.set(err?.message ?? 'Failed to load footer.');
                this._loading.set(false);
            }
        });
    }
}