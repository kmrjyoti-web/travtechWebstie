import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AboutSectionApi } from '../api/about-section.api';
import { AboutSectionMapper } from '../models/about-section.mapper';
import { AboutSectionModel } from '../models/about-section.model';

@Injectable({ providedIn: 'root' })
export class AboutSectionRepository {
    private api = inject(AboutSectionApi);

    get(): Observable<AboutSectionModel> {
        return this.api.get().pipe(map(dto => AboutSectionMapper.fromDto(dto)));
    }
}