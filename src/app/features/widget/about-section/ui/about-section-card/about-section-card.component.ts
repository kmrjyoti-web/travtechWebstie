import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup'; // ✅ IMPORTANT
import { AboutSectionCounter } from '../../models/about-section.model';

@Component({
    selector: 'app-about-section-card',
    standalone: true,
    imports: [CommonModule, CountUpModule], // ✅ IMPORTANT
    templateUrl: './about-section-card.component.html',
})
export class AboutSectionCardComponent {
    @Input({ required: true }) item!: AboutSectionCounter;
}