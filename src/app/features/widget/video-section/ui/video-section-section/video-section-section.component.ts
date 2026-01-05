import { Component, OnInit, inject } from '@angular/core';


import { VideoSectionStore } from '../../store/video-section.store';
import { VideoSectionCardComponent } from '../video-section-card/video-section-card.component';

@Component({
    selector: 'app-video-section-section',
    standalone: true,
    imports: [VideoSectionCardComponent],
    providers: [VideoSectionStore],
    templateUrl: './video-section-section.component.html',
})
export class VideoSectionSectionComponent implements OnInit {
    readonly store = inject(VideoSectionStore);
    trackById = (_: number, it: { id: string }) => it.id;
    ngOnInit(): void {
        this.store.load();
    }
}