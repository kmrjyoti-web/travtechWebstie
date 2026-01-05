import { Component, Input } from '@angular/core';

import { ClientItem } from '../../models/client-section.model';

@Component({
    selector: 'app-client-section-card',
    standalone: true,
    imports: [],
    templateUrl: './client-section-card.component.html',
})
export class ClientSectionCardComponent {
    @Input({ required: true }) item!: ClientItem;
}