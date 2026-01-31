import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FooterColumn, FooterLink } from '../../models/footer.model';

@Component({
    selector: 'app-footer-column-card',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './footer-column-card.component.html',
})
export class FooterColumnCardComponent {
    @Input({ required: true }) column!: FooterColumn;

    // routes object comes from parent (your existing `routes.*`)
    @Input() routes: Record<string, any> | null = null;

    resolveRoute(link: FooterLink): any | null {
        const key = link.routeKey;
        if (!key) return null;
        return this.routes?.[key] ?? null;
    }
}