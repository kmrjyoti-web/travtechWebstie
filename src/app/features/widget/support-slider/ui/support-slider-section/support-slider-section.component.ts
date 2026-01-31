import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportSliderStore } from '../../store/support-slider.store';
import { SupportSliderCardComponent } from '../support-slider-card/support-slider-card.component';

@Component({
    selector: 'app-support-slider-section',
    standalone: true,
    imports: [CommonModule, SupportSliderCardComponent],
    templateUrl: './support-slider-section.component.html',
})
export class SupportSliderSectionComponent implements OnInit {
    constructor(public readonly store: SupportSliderStore) {}

    ngOnInit(): void {
        this.store.load();
    }
}