import { Component, Input, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FooterStore } from '../../store/footer.store';
import { FooterColumnCardComponent } from '../footer-column-card/footer-column-card.component';

@Component({
    selector: 'app-footer-section',
    standalone: true,
    imports: [RouterModule, FooterColumnCardComponent],
    templateUrl: './footer-section.component.html',
})
export class FooterSectionComponent implements OnInit {
    @Input() base: string | null = null;
    @Input() page: string | null = null;

    // ✅ pass your existing `routes` object
    @Input({ required: true }) routes!: Record<string, any>;

    constructor(public readonly store: FooterStore) {}

    ngOnInit(): void {
        this.store.load();
    }

    isHiddenByBase(): boolean {
        const data = this.store.data();
        if (!data) return false;
        return !!this.base && data.hideOnBase.includes(this.base);
    }

    isRtl(): boolean {
        return this.page === 'index-rtl';
    }

    homeRoute(): any {
        const key = this.store.data()?.brand?.homeRouteKey ?? 'index';
        return this.routes?.[key] ?? this.routes?.['index'] ?? '/';
    }
}