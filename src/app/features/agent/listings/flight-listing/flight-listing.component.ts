import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flight-listing',
  imports: [RouterLink],
  
  templateUrl: './flight-listing.component.html',
  styleUrl: './flight-listing.component.scss'
})
export class FlightListingComponent {
routes = routes
}
