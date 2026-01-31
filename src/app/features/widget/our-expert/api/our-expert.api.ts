import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OurExpertDto } from '../dto/our-expert.dto';

@Injectable({ providedIn: 'root' })
export class OurExpertApi {
    private readonly http = inject(HttpClient);

    getJson(): Observable<OurExpertDto> {
        return this.http.get<OurExpertDto>('assets/data/our-expert.json');
    }
}