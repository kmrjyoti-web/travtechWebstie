import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BenefitSection2Dto } from '../dto/benefit-section-2.dto';
import {environment} from "../../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BenefitSection2Api {
    private http = inject(HttpClient);

    getFromAssets(): Observable<BenefitSection2Dto> {
        return this.http.get<BenefitSection2Dto>('assets/data/benefit-section-2.json');
    }

    getFromServer(): Observable<BenefitSection2Dto> {
        return this.http.get<BenefitSection2Dto>(`${environment.baseUrl}/Travel/Benefits/Get`);
    }
}