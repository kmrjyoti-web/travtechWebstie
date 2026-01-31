// import { inject, Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { TourApi } from '../api/tour.api';
// import { TourDetailModel } from '../../models/tour-detail.model';
// import { TourDetailMapper } from '../../mapper/tour-detail.mapper';
//
// @Injectable({ providedIn: 'root' })
// export class TourRepository {
//     private api = inject(TourApi);
//
//     getDetail(tourUniqueId: string): Observable<TourDetailModel> {
//         console.log('TourRepository.getDetail called for:', tourUniqueId);
//         return this.api.getById(tourUniqueId).pipe(
//             map(res => {
//                 console.log('TourRepository.getDetail API response received, mapping...');
//                 return TourDetailMapper.fromDto(res.data);
//             })
//         );
//     }
// }

import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TourApi } from '../api/tour.api';
import { TourDetailModel } from '../../models/tour-detail.model';
import { TourDetailMapper } from '../../mapper/tour-detail.mapper';

@Injectable({ providedIn: 'root' })
export class TourRepository {
    private api = inject(TourApi);

    getDetail(url: string): Observable<TourDetailModel> {
        return this.api.getById(url).pipe(
            map(res => TourDetailMapper.fromDto(res.data))
        );
    }
}