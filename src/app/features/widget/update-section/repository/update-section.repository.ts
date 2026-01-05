import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UpdateSectionApi } from '../api/update-section.api';
import { UpdateSectionVm } from '../models/update-section.model';
import { UpdateSectionMapper } from '../models/update-section.mapper';

@Injectable({ providedIn: 'root' })
export class UpdateSectionRepository {
    private readonly api = inject(UpdateSectionApi);

    getVm(): Observable<UpdateSectionVm> {
        return this.api.getJson().pipe(map(UpdateSectionMapper.fromDto));
    }
}