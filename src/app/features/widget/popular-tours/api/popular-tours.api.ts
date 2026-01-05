import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopularToursDto } from '../dto/popular-tours.dto';
import {environment} from "../../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PopularToursApi {
    private http = inject(HttpClient);

    getFromAssets(): Observable<PopularToursDto> {
        return this.http.get<PopularToursDto>('assets/data/popular-tours.json');
    }

    getFromServer(): Observable<PopularToursDto> {
        return this.http.get<PopularToursDto>(`${environment.baseUrl}/Travel/Tours/Popular`);
    }
}