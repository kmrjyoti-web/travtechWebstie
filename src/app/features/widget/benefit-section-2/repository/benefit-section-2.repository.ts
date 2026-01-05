import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BenefitSection2Api } from '../api/benefit-section-2.api';
import { BenefitSection2Dto } from '../dto/benefit-section-2.dto';

@Injectable({ providedIn: 'root' })
export class BenefitSection2Repository {
    private api = inject(BenefitSection2Api);
    private readonly useServer = false;

    get(): Observable<BenefitSection2Dto> {
        return this.useServer ? this.api.getFromServer() : this.api.getFromAssets();
    }
}