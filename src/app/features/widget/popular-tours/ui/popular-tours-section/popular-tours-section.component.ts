import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';

import { PopularToursStore } from '../../store/popular-tours.store';
import { PopularToursCardComponent } from '../popular-tours-card/popular-tours-card.component';

@Component({
    selector: 'app-popular-tours-section',
    standalone: true,
    imports: [RouterModule, PopularToursCardComponent],
    templateUrl: './popular-tours-section.component.html',
})
export class PopularToursSectionComponent {
    store = inject(PopularToursStore);

    routes = {
        tourGrid: '/tour/grid',
        tourDetails: '/tour/details', // (not used directly; each card has its own detailsRoute)
    };

    private fav = new Set<string>();

    ngOnInit(): void {
        this.store.load();
    }

    isFav = (id: string) => this.fav.has(id);

    toggleFav = (id: string) => {
        if (this.fav.has(id)) this.fav.delete(id);
        else this.fav.add(id);
    };

    trackById = (_: number, x: any) => x?.id;
}