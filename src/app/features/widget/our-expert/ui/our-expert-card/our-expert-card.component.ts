import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurExpertItem } from '../../models/our-expert.model';

@Component({
    selector: 'app-our-expert-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './our-expert-card.component.html',
})
export class OurExpertCardComponent {
    @Input({ required: true }) item!: OurExpertItem;
}