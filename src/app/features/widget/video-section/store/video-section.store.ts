import { computed, inject, signal } from '@angular/core';
import { VideoSectionRepository } from '../repository/video-section.repository';
import { VideoSectionVm } from '../models/video-section.model';

export class VideoSectionStore {
    private readonly repo = inject(VideoSectionRepository);

    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    private readonly _vm = signal<VideoSectionVm | null>(null);

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
                this._error.set(e?.message ?? 'Failed to load video section.');
                this._loading.set(false);
            },
        });
    }
}