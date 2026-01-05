import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PreferencesCardVm } from '../../models/preferences-card.model';

@Component({
    selector: 'app-preferences-card-item',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './preferences-card-item.component.html',
})
export class PreferencesCardItemComponent {
    @Input({ required: true }) card!: PreferencesCardVm;

    // if you want all cards to always go to routes.tourGrid, set this true and provide [fixedRoute] from section
    @Input() fixedRoute: string | any[] | null = null;

    get link(): string | any[] {
        return this.fixedRoute ?? this.card.route;
    }
}