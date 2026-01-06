import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';
import { PreferencesCardStore } from '../../store/preferences-card.store';
import { PreferencesCardItemComponent } from '../preferences-card-item/preferences-card-item.component';

@Component({
    selector: 'app-preferences-card-section',
    standalone: true,
    imports: [RouterModule, PreferencesCardItemComponent],
    templateUrl: './preferences-card-section.component.html',
})
export class PreferencesCardSectionComponent implements OnInit {
    store = inject(PreferencesCardStore);

    public routes = routes;

    trackById = (_: number, x: any) => x?.id;

    ngOnInit(): void {
        this.store.load();
    }
}