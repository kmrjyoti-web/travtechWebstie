import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularToursApi } from '../api/popular-tours.api';
import { PopularToursDto } from '../dto/popular-tours.dto';

@Injectable({ providedIn: 'root' })
export class PopularToursRepository {
    private api = inject(PopularToursApi);
    private readonly useServer = false;

    get(): Observable<PopularToursDto> {
        return this.useServer ? this.api.getFromServer() : this.api.getFromAssets();
    }
}