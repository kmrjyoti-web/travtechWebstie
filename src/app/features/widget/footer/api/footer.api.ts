import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FooterDto } from '../dto/footer.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FooterApi {
    private readonly url = 'assets/data/footer.json';
    constructor(private readonly http: HttpClient) {}

    get(): Observable<FooterDto> {
        return this.http.get<FooterDto>(this.url);
    }
}