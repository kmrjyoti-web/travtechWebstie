import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoSectionDto } from '../dto/video-section.dto';

@Injectable({ providedIn: 'root' })
export class VideoSectionApi {
    private readonly http = inject(HttpClient);

    getJson(): Observable<VideoSectionDto> {
        return this.http.get<VideoSectionDto>('assets/data/video-section.json');
    }
}