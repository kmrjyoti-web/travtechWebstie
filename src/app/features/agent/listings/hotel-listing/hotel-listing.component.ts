import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-listing',
  imports: [RouterLink],
  
  templateUrl: './hotel-listing.component.html',
  styleUrl: './hotel-listing.component.scss'
})
export class HotelListingComponent {
routes = routes
}
