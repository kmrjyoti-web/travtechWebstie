import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TrendingPlacesApi } from '../api/trending-places.api';
import { TrendingPlacesDto } from '../dto/trending-places.dto';

@Injectable({ providedIn: 'root' })
export class TrendingPlacesRepository {
    private api = inject(TrendingPlacesApi);
    private readonly useServer = false;

    get(): Observable<TrendingPlacesDto> {
        return this.useServer ? this.api.getFromServer() : this.api.getFromAssets();
    }
}