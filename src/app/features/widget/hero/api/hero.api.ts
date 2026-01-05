import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroConfigDtoRoot } from '../dto/hero.dto';

@Injectable({ providedIn: 'root' })
export class HeroApi {
    constructor(private http: HttpClient) {}

    /** swap this URL later to real backend, keep same DTO */
    getHeroConfig(): Observable<HeroConfigDtoRoot> {
        return this.http.get<HeroConfigDtoRoot>('/assets/data/hero.json');
    }
}