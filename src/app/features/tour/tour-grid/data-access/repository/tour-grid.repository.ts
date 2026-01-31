import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TourGridApi } from '../api/tour-grid.api';
import { TourGridItemModel } from '../../models/tour-grid.model';
import { TourGridMapper } from '../../mapper/tour-grid.mapper';

@Injectable({ providedIn: 'root' })
export class TourGridRepository {
    private api = inject(TourGridApi);

    getFilteredTours(key: string): Observable<TourGridItemModel[]> {
        return this.api.filter(key).pipe(
            map(res => TourGridMapper.fromDtoList(res.data))
        );
    }
}
