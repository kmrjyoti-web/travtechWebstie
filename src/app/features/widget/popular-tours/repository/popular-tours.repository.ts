import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularToursApi } from '../api/popular-tours.api';
import { PopularToursDto } from '../dto/popular-tours.dto';

@Injectable({ providedIn: 'root' })
export class PopularToursRepository {
    private api = inject(PopularToursApi);
    private readonly useServer = true; // Switch to true for dynamic data

    getFilteredTours(key: string): Observable<PopularToursDto> {
        if (this.useServer) {
            return this.api.getFilteredTours(key);
        }
        // Fallback to assets if needed, but structure might differ
        return this.api.getFromAssets();
    }
}