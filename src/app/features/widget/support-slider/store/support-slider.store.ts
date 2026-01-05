import { Injectable, computed, signal } from '@angular/core';
import { SupportSlider } from '../models/support-slider.model';
import { SupportSliderRepository } from '../repository/support-slider.repository';

@Injectable({ providedIn: 'root' })
export class SupportSliderStore {
    private readonly _loading = signal<boolean>(false);
    private readonly _error = signal<string | null>(null);
    private readonly _data = signal<SupportSlider | null>(null);

    readonly loading = computed(() => this._loading());
    readonly error = computed(() => this._error());
    readonly data = computed(() => this._data());

    constructor(private readonly repo: SupportSliderRepository) {}

    load(): void {
        this._loading.set(true);
        this._error.set(null);

        this.repo.get().subscribe({
            next: (res) => {
                this._data.set(res);
                this._loading.set(false);
            },
            error: (err) => {
                this._error.set(err?.message ?? 'Failed to load support slider.');
                this._loading.set(false);
            },
        });
    }
}