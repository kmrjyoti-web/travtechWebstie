import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FooterApi } from '../api/footer.api';
import { FooterData } from '../models/footer.model';
import { FooterMapper } from '../models/footer.mapper';

@Injectable({ providedIn: 'root' })
export class FooterRepository {
    constructor(private readonly api: FooterApi) {}

    get(): Observable<FooterData> {
        return this.api.get().pipe(map(FooterMapper.fromDto));
    }
}