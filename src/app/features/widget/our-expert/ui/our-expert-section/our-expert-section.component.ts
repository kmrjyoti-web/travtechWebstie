import { Component, OnInit, inject } from '@angular/core';

import { RouterModule } from '@angular/router';

import { OurExpertStore } from '../../store/our-expert.store';
import { OurExpertCardComponent } from '../our-expert-card/our-expert-card.component';

@Component({
    selector: 'app-our-expert-section',
    standalone: true,
    imports: [RouterModule, OurExpertCardComponent],
    providers: [OurExpertStore],
    templateUrl: './our-expert-section.component.html',
})
export class OurExpertSectionComponent implements OnInit {
    readonly store = inject(OurExpertStore);

    // you already have routes object; keep same pattern
    routes: any = {};

    ngOnInit(): void {
        this.store.load();
    }
}