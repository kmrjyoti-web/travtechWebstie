import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutSectionStore } from '../../store/about-section.store';
import { AboutSectionCardComponent } from '../about-section-card/about-section-card.component';

@Component({
    selector: 'app-about-section-section',
    standalone: true,
    imports: [CommonModule, RouterModule, AboutSectionCardComponent],
    templateUrl: './about-section-section.component.html',
})
export class AboutSectionSectionComponent {
    store = inject(AboutSectionStore);

    constructor() {
        this.store.load();
    }
}