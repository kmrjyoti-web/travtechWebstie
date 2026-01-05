import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutSectionDto } from '../dto/about-section.dto';

@Injectable({ providedIn: 'root' })
export class AboutSectionApi {
    private http = inject(HttpClient);

    private readonly endpoint = 'assets/data/about-section.json';

    get(): Observable<AboutSectionDto> {
        return this.http.get<AboutSectionDto>(this.endpoint);
    }
}