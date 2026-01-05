import { Component, inject } from '@angular/core';


import { BenefitSection2Store } from '../../store/benefit-section-2.store';
import { BenefitSection2CardComponent } from '../benefit-section-2-card/benefit-section-2-card.component';

@Component({
    selector: 'app-benefit-section-2-section',
    standalone: true,
    imports: [BenefitSection2CardComponent],
    templateUrl: './benefit-section-2-section.component.html',
})
export class BenefitSection2SectionComponent {
    store = inject(BenefitSection2Store);

    trackById = (_: number, x: any) => x?.id;

    ngOnInit(): void {
        this.store.load();
    }
}