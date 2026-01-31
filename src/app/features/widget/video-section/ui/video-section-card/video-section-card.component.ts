import { Component, Input } from '@angular/core';


// ✅ Adjust import name if your package exports differently
import { LightgalleryModule } from 'lightgallery/angular';

import { VideoItem } from '../../models/video-section.model';

@Component({
    selector: 'app-video-section-card',
    standalone: true,
    imports: [LightgalleryModule],
    templateUrl: './video-section-card.component.html',
})
export class VideoSectionCardComponent {
    @Input({ required: true }) item!: VideoItem;

    @Input() settings: any = {};
    @Input() size: string = '1400-933';

    // same signature you used in template
    onInit = (_detail: any): void => {};
}