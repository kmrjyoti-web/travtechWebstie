import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlogSectionApi } from '../api/blog-section.api';
import { BlogSectionVm } from '../models/blog-section.model';
import { BlogSectionMapper } from '../models/blog-section.mapper';

@Injectable({ providedIn: 'root' })
export class BlogSectionRepository {
    private readonly api = inject(BlogSectionApi);

    getVm(): Observable<BlogSectionVm> {
        return this.api.getJson().pipe(map(BlogSectionMapper.fromDto));
    }
}