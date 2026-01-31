import { Component, Input } from '@angular/core';

import { SupportSliderItem } from '../../models/support-slider.model';

@Component({
    selector: 'app-support-slider-card',
    standalone: true,
    imports: [],
    templateUrl: './support-slider-card.component.html',
})
export class SupportSliderCardComponent {
    @Input({ required: true }) item!: SupportSliderItem;
}