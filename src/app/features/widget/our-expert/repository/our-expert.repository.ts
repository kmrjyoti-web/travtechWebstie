import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OurExpertApi } from '../api/our-expert.api';
import { OurExpertVm } from '../models/our-expert.model';
import { OurExpertMapper } from '../models/our-expert.mapper';

@Injectable({ providedIn: 'root' })
export class OurExpertRepository {
    private readonly api = inject(OurExpertApi);

    getVm(): Observable<OurExpertVm> {
        return this.api.getJson().pipe(map(OurExpertMapper.fromDto));
    }
}