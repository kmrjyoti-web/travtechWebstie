import { signal } from '@angular/core';
import { TourGridItemModel } from '../models/tour-grid.model';

export class TourGridSignalForm {
    items = signal<TourGridItemModel[]>([]);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);
    filterKey = signal<string>('');
}
