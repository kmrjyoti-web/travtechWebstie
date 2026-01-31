import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferencesCardDto } from '../dto/preferences-card.dto';
import {environment} from "../../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PreferencesCardApi {
    private http = inject(HttpClient);

    // ✅ JSON first
    getFromAssets(): Observable<PreferencesCardDto[]> {
        return this.http.get<PreferencesCardDto[]>('assets/data/preferences-cards.json');
    }

    // ✅ later: switch endpoint only
    getFromServer(): Observable<PreferencesCardDto[]> {
        return this.http.get<PreferencesCardDto[]>(`${environment.baseUrl}/Travel/PreferenceCategory/GetAll`);
    }
}