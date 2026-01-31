import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopularToursDto } from '../dto/popular-tours.dto';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PopularToursApi {
    private http = inject(HttpClient);

    // Dynamic Filter API
    getFilteredTours(key: string): Observable<PopularToursDto> {
        return this.http.get<PopularToursDto>(`${environment.baseUrl}/Itinerary/Filter?key=${key}`);
    }

    // Existing methods (keep if needed for fallback or remove if unified)
    getFromAssets(): Observable<any> { // Changing return type as structure changed
        return this.http.get<any>('assets/data/popular-tours.json');
    }
}