import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PreferencesCardApi } from '../api/preferences-card.api';
import { PreferencesCardDto } from '../dto/preferences-card.dto';

@Injectable({ providedIn: 'root' })
export class PreferencesCardRepository {
    private api = inject(PreferencesCardApi);

    private readonly useServer = false;

    getAll(): Observable<PreferencesCardDto[]> {
        return this.useServer ? this.api.getFromServer() : this.api.getFromAssets();
    }
}