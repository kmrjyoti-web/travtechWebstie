import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';

import { DestinationStore } from '../../store/destination.store';
import {DestinationCardComponent} from "../destination-list/destination-card.component";


@Component({
    selector: 'app-destination-section',
    standalone: true,
    imports: [RouterModule, DestinationCardComponent],
    templateUrl: './destination-section.component.html',
})
export class DestinationSectionComponent {
    store = inject(DestinationStore);

    routes = {
        destination: '/destination',
    };

    trackById = (_: number, x: any) => x?.id;

    ngOnInit(): void {
        this.store.load();
    }
}