import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FaqSectionApi } from '../api/faq-section.api';
import { FaqSectionVm } from '../models/faq-section.model';
import { FaqSectionMapper } from '../models/faq-section.mapper';

@Injectable({ providedIn: 'root' })
export class FaqSectionRepository {
    private readonly api = inject(FaqSectionApi);

    getVm(): Observable<FaqSectionVm> {
        return this.api.getJson().pipe(map(FaqSectionMapper.fromDto));
    }
}