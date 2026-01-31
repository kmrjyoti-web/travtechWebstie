import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BenefitSectionApi } from '../api/benefit-section.api';
import { BenefitSectionDto } from '../dto/benefit-section.dto';

@Injectable({ providedIn: 'root' })
export class BenefitSectionRepository {
    private api = inject(BenefitSectionApi);
    private readonly useServer = false;

    get(): Observable<BenefitSectionDto> {
        return this.useServer ? this.api.getFromServer() : this.api.getFromAssets();
    }
}