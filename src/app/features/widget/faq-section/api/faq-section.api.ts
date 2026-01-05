import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FaqSectionDto } from '../dto/faq-section.dto';

@Injectable({ providedIn: 'root' })
export class FaqSectionApi {
    private readonly http = inject(HttpClient);

    getJson(): Observable<FaqSectionDto> {
        return this.http.get<FaqSectionDto>('assets/data/faq-section.json');
    }
}