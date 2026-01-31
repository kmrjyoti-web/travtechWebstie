import { Component, OnInit } from '@angular/core';

import { HeroStore } from '../../store/hero.store';
import { HeroCardSectionComponent } from '../hero-card-section/hero-card-section.component';
import { HeroTabPanelComponent } from '../hero-tab-panel/hero-tab-panel.component';

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [HeroCardSectionComponent, HeroTabPanelComponent, HeroCardSectionComponent],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
    constructor(public store: HeroStore) {}

    ngOnInit(): void {
        this.store.load(false);
    }

    onSubmit(e: { tabId: string; value: any }) {
        // ✅ Here you route to results page, call API, etc.
        console.log('Hero search submit:', e.tabId, e.value);
    }
}