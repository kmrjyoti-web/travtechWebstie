import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportSliderDto } from '../dto/support-slider.dto';

@Injectable({ providedIn: 'root' })
export class SupportSliderApi {
    private readonly url = 'assets/data/support-slider.json';

    constructor(private readonly http: HttpClient) {}

    get(): Observable<SupportSliderDto> {
        return this.http.get<SupportSliderDto>(this.url);
    }
}