import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientSectionDto } from '../dto/client-section.dto';

@Injectable({ providedIn: 'root' })
export class ClientSectionApi {
    private readonly http = inject(HttpClient);

    getJson(): Observable<ClientSectionDto> {
        return this.http.get<ClientSectionDto>('assets/data/client-section.json');
    }
}