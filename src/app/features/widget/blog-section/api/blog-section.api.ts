import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogSectionDto } from '../dto/blog-section.dto';

@Injectable({ providedIn: 'root' })
export class BlogSectionApi {
    private readonly http = inject(HttpClient);

    getJson(): Observable<BlogSectionDto> {
        return this.http.get<BlogSectionDto>('assets/data/blog-section.json');
    }
}