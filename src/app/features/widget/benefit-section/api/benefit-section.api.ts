import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BenefitSectionDto } from '../dto/benefit-section.dto';
import {environment} from "../../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BenefitSectionApi {
    private http = inject(HttpClient);

    getFromAssets(): Observable<BenefitSectionDto> {
        return this.http.get<BenefitSectionDto>('assets/data/benefit-sections.json');
    }

    getFromServer(): Observable<BenefitSectionDto> {
        return this.http.get<BenefitSectionDto>(`${environment.baseUrl}/Travel/BenefitSection/Get`);
    }
}