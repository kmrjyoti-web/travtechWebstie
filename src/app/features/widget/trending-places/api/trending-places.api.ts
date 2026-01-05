import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrendingPlacesDto } from '../dto/trending-places.dto';
import {environment} from "../../../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class TrendingPlacesApi {
    private http = inject(HttpClient);

    getFromAssets(): Observable<TrendingPlacesDto> {
        return this.http.get<TrendingPlacesDto>('assets/data/trending-places.json');
    }

    getFromServer(): Observable<TrendingPlacesDto> {
        return this.http.get<TrendingPlacesDto>(`${environment.baseUrl}/Travel/TrendingPlaces/Get`);
    }
}