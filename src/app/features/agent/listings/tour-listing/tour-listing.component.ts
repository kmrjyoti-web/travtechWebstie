import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tour-listing',
  imports: [RouterLink],
  
  templateUrl: './tour-listing.component.html',
  styleUrl: './tour-listing.component.scss'
})
export class TourListingComponent {
routes = routes
}
