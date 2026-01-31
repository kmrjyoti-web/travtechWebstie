import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VideoSectionApi } from '../api/video-section.api';
import { VideoSectionVm } from '../models/video-section.model';
import { VideoSectionMapper } from '../models/video-section.mapper';

@Injectable({ providedIn: 'root' })
export class VideoSectionRepository {
    private readonly api = inject(VideoSectionApi);

    getVm(): Observable<VideoSectionVm> {
        return this.api.getJson().pipe(map(VideoSectionMapper.fromDto));
    }
}