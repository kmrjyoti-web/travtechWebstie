import { Component, OnInit, inject } from '@angular/core';

import { FaqSectionStore } from '../../store/faq-section.store';

@Component({
    selector: 'app-faq-section',
    standalone: true,
    imports: [],
    providers: [FaqSectionStore],
    templateUrl: './faq-section.component.html',
})
export class FaqSectionComponent implements OnInit {
    readonly store = inject(FaqSectionStore);

    ngOnInit(): void {
        this.store.load();
    }
}