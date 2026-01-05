import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, TourDetailDto } from '../../dto/tour-detail.dto';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TourApi {
    private http = inject(HttpClient);

    getById(url: string): Observable<ApiResponse<TourDetailDto>> {
        console.log('TourApi.getById called with:', url);
        return this.http.get<ApiResponse<TourDetailDto>>(`${environment.baseUrl}/Itinerary/${url}`).pipe(
            tap(res => console.log('TourApi.getById response:', res))
        );
    }
}