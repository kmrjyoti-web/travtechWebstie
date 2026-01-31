import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateSectionDto } from '../dto/update-section.dto';

@Injectable({ providedIn: 'root' })
export class UpdateSectionApi {
    private readonly http = inject(HttpClient);

    getJson(): Observable<UpdateSectionDto> {
        return this.http.get<UpdateSectionDto>('assets/data/update-section.json');
    }
}