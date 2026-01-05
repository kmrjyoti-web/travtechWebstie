import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero-card-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero-card-section.component.html',
    styleUrl: './hero-card-section.component.scss',
})
export class HeroCardSectionComponent {
    @Input() backgroundUrl = '';
    @Input() title = '';
    @Input() titleHighlight = '';
    @Input() subtitle = '';

    /** maintain hero height */
    @Input() minHeightPx = 620;

    /** background-attachment fixed */
    @Input() parallax = true;

    /** panel visibility */
    @Input() showPanel = true;

    /** reserve blank space when panel hidden (keep same hero height composition) */
    @Input() reservePanelSpace = true;
    @Input() reservedPanelHeightPx = 260;

    get sectionStyle(): Record<string, string> {
        return {
            backgroundImage: this.backgroundUrl ? `url('${this.backgroundUrl}')` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: this.parallax ? 'fixed' : 'scroll',
            minHeight: `${this.minHeightPx}px`,
        };
    }
}