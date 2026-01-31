import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DestinationDto } from '../dto/destination.dto';
import {environment} from "../../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class DestinationApi {
    private http = inject(HttpClient);

    // ✅ JSON first (today)
    getFromAssets(): Observable<DestinationDto[]> {
        return this.http.get<DestinationDto[]>('assets/data/destinations.json');
    }

    // ✅ Later: change only this endpoint
    getFromServer(): Observable<DestinationDto[]> {
        return this.http.get<DestinationDto[]>(`${environment.baseUrl}/Travel/Destination/GetAll`);
    }
}