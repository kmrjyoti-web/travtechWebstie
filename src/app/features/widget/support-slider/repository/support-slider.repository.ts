import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SupportSliderApi } from '../api/support-slider.api';
import { SupportSlider } from '../models/support-slider.model';
import { SupportSliderMapper } from '../models/support-slider.mapper';

@Injectable({ providedIn: 'root' })
export class SupportSliderRepository {
    constructor(private readonly api: SupportSliderApi) {}

    get(): Observable<SupportSlider> {
        return this.api.get().pipe(map(SupportSliderMapper.fromDto));
    }
}