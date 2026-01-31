import { RouterModule } from '@angular/router';
import { routes } from './../../../shared/routes/routes';
import { Component } from '@angular/core';

import { CarListingComponent } from './car-listing/car-listing.component';
import { CruiseListingComponent } from './cruise-listing/cruise-listing.component';
import { FlightListingComponent } from './flight-listing/flight-listing.component';
import { HotelListingComponent } from './hotel-listing/hotel-listing.component';
import { TourListingComponent } from './tour-listing/tour-listing.component';

@Component({
  selector: 'app-listings',
  imports: [RouterModule, CarListingComponent, CruiseListingComponent, FlightListingComponent, HotelListingComponent, TourListingComponent],
  
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss'
})
export class ListingsComponent {
routes = routes
}
