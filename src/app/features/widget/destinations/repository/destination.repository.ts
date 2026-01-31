import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DestinationApi } from '../api/destination.api';
import { DestinationDto } from '../dto/destination.dto';

@Injectable({ providedIn: 'root' })
export class DestinationRepository {
    private api = inject(DestinationApi);

    // flip later (or read from environment)
    private readonly useServer = false;

    getAll(): Observable<DestinationDto[]> {
        return this.useServer ? this.api.getFromServer() : this.api.getFromAssets();
    }
}