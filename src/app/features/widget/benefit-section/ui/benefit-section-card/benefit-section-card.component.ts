import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitItemVm } from '../../models/benefit-section.model';

@Component({
    selector: 'app-benefit-section-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './benefit-section-card.component.html',
})
export class BenefitSectionCardComponent {
    @Input({ required: true }) item!: BenefitItemVm;
}