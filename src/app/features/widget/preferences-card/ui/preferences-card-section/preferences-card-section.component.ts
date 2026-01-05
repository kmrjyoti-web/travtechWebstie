import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';

import { PreferencesCardStore } from '../../store/preferences-card.store';
import { PreferencesCardItemComponent } from '../preferences-card-item/preferences-card-item.component';

@Component({
    selector: 'app-preferences-card-section',
    standalone: true,
    imports: [RouterModule, PreferencesCardItemComponent],
    templateUrl: './preferences-card-section.component.html',
})
export class PreferencesCardSectionComponent {
    store = inject(PreferencesCardStore);

    routes = {
        tourGrid: '/tour/grid',
    };

    trackById = (_: number, x: any) => x?.id;

    ngOnInit(): void {
        this.store.load();
    }
}