import { Component, inject } from '@angular/core';


import { BenefitSectionStore } from '../../store/benefit-section.store';
import { BenefitSectionCardComponent } from '../benefit-section-card/benefit-section-card.component';

@Component({
    selector: 'app-benefit-section',
    standalone: true,
    imports: [BenefitSectionCardComponent],
    templateUrl: './benefit-section.component.html',
})
export class BenefitSectionComponent {
    store = inject(BenefitSectionStore);

    ngOnInit(): void {
        this.store.load();
    }

    trackById = (_: number, x: any) => x?.id;
}