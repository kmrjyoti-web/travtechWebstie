import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientSectionApi } from '../api/client-section.api';
import { ClientSectionVm } from '../models/client-section.model';
import { ClientSectionMapper } from '../models/client-section.mapper';

@Injectable({ providedIn: 'root' })
export class ClientSectionRepository {
    private readonly api = inject(ClientSectionApi);

    getVm(): Observable<ClientSectionVm> {
        return this.api.getJson().pipe(map(ClientSectionMapper.fromDto));
    }
}