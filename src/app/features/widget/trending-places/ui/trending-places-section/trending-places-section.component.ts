import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';

import { TrendingPlacesStore } from '../../store/trending-places.store';
import { TrendingHotelCardComponent } from '../cards/trending-hotel-card.component';
import { TrendingFlightCardComponent } from '../cards/trending-flight-card.component';
import { TrendingCarCardComponent } from '../cards/trending-car-card.component';
import { TrendingCruiseCardComponent } from '../cards/trending-cruise-card.component';
import { TrendingTourCardComponent } from '../cards/trending-tour-card.component';

@Component({
    selector: 'app-trending-places-section',
    standalone: true,
    imports: [
    RouterModule,
    TrendingHotelCardComponent,
    TrendingFlightCardComponent,
    TrendingCarCardComponent,
    TrendingCruiseCardComponent,
    TrendingTourCardComponent,
    TrendingHotelCardComponent
],
    templateUrl: './trending-places-section.component.html',
})
export class TrendingPlacesSectionComponent {
    store = inject(TrendingPlacesStore);

    routes = {
        hotelGrid: '/hotel/grid',
        hotelDetails: '/hotel/details',
        flightDetails: '/flight/details',
        carDetails: '/car/details',
        cruiseDetails: '/cruise/details',
        tourDetails: '/tour/details',
    };

    ngOnInit(): void {
        this.store.load();
    }

    onTabClick(key: string): void {
        this.store.setActiveTab(key);
    }

    trackById = (_: number, x: any) => x?.id;
}