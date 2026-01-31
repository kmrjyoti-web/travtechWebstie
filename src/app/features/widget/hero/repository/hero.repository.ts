import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { HeroApi } from '../api/hero.api';
import { HeroConfig } from '../models/hero.model';
import { HeroMapper } from '../models/hero.mapper';

@Injectable({ providedIn: 'root' })
export class HeroRepository {
    private cached$?: Observable<HeroConfig>;

    constructor(private api: HeroApi) {}

    getConfig(force = false): Observable<HeroConfig> {
        if (!this.cached$ || force) {
            this.cached$ = this.api.getHeroConfig().pipe(
                map(dto => HeroMapper.fromDto(dto)),
                shareReplay(1)
            );
        }
        return this.cached$;
    }
}