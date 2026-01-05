import { Injectable, signal, computed } from '@angular/core';
import { HeroRepository } from '../repository/hero.repository';
import { HeroConfig } from '../models/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroStore {
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly config = signal<HeroConfig | null>(null);

    readonly panelEnabled = computed(() => !!this.config()?.panel.enabled && (this.config()?.panel.tabs?.length ?? 0) > 0);

    constructor(private repo: HeroRepository) {}

    load(force = false): void {
        this.loading.set(true);
        this.error.set(null);

        this.repo.getConfig(force).subscribe({
            next: (cfg) => {
                this.config.set(cfg);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err?.message ?? 'Failed to load hero config');
                this.loading.set(false);
            }
        });
    }
}