import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitSection2CardVm } from '../../models/benefit-section-2.model';

@Component({
    selector: 'app-benefit-section-2-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './benefit-section-2-card.component.html',
})
export class BenefitSection2CardComponent {
    @Input({ required: true }) card!: BenefitSection2CardVm;
}