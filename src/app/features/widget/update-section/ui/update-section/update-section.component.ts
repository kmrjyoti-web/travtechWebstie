import { Component, OnInit, inject } from '@angular/core';


import { UpdateSectionStore } from '../../store/update-section.store';
import { UpdateCardComponent } from '../update-card/update-card.component';

@Component({
    selector: 'app-update-section',
    standalone: true,
    imports: [UpdateCardComponent],
    providers: [UpdateSectionStore],
    templateUrl: './update-section.component.html',
})
export class UpdateSectionComponent implements OnInit {
    readonly store = inject(UpdateSectionStore);

    ngOnInit(): void {
        this.store.load();
    }
}