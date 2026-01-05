import { Injectable, computed, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AboutSectionRepository } from '../repository/about-section.repository';
import { ABOUT_SECTION_EMPTY, AboutSectionModel } from '../models/about-section.model';

type AboutSectionState = {
    loading: boolean;
    error: string | null;
    data: AboutSectionModel;
};

@Injectable({ providedIn: 'root' })
export class AboutSectionStore {
    private repo = inject(AboutSectionRepository);
    private destroyRef = inject(DestroyRef);

    private state = signal<AboutSectionState>({
        loading: false,
        error: null,
        data: ABOUT_SECTION_EMPTY,
    });

    loading = computed(() => this.state().loading);
    error = computed(() => this.state().error);
    data = computed(() => this.state().data);

    ratingStarsArray = computed(() =>
        Array.from({ length: this.data().footer.ratingStars }, (_, i) => i)
    );

    load(): void {
        this.state.update(s => ({ ...s, loading: true, error: null }));

        this.repo.get()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (data) => this.state.update(s => ({ ...s, data, loading: false })),
                error: (err) =>
                    this.state.update(s => ({
                        ...s,
                        loading: false,
                        error: err?.message ?? 'Failed to load About Section',
                    })),
            });
    }
}