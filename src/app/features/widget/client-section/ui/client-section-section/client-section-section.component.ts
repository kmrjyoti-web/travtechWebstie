import { Component, OnInit, inject } from '@angular/core';


import { ClientSectionStore } from '../../store/client-section.store';
import { ClientSectionCardComponent } from '../client-section-card/client-section-card.component';

@Component({
    selector: 'app-client-section',
    standalone: true,
    imports: [ClientSectionCardComponent],
    providers: [ClientSectionStore],
    templateUrl: './client-section-section.component.html',
})
export class ClientSectionSectionComponent implements OnInit {
    readonly store = inject(ClientSectionStore);

    ngOnInit(): void {
        this.store.load();
    }

    trackById = (_: number, it: { id: string }) => it.id;
}