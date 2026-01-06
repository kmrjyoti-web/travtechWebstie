import { TourGridItemModel } from '../models/tour-grid.model';
import { TourGridSignalForm } from './tour-grid.signal-form';

export class TourGridSignalMapper {
    static fromModelList(models: TourGridItemModel[], form: TourGridSignalForm): void {
        form.items.set(models);
        form.loading.set(false);
        form.error.set(null);
    }

    static setError(error: string, form: TourGridSignalForm): void {
        form.error.set(error);
        form.loading.set(false);
    }

    static setLoading(loading: boolean, form: TourGridSignalForm): void {
        form.loading.set(loading);
    }
}
