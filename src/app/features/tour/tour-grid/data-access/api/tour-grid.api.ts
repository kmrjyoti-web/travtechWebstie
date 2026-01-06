import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, TourGridItemDto } from '../../dto/tour-grid.dto';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TourGridApi {
    private http = inject(HttpClient);

    filter(key: string): Observable<ApiResponse<TourGridItemDto[]>> {
        return this.http.get<ApiResponse<TourGridItemDto[]>>(`${environment.baseUrl}/Itinerary/Filter?key=${key}`);
    }
}
