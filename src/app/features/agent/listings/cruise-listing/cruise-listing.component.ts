import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cruise-listing',
  imports: [RouterLink],
  
  templateUrl: './cruise-listing.component.html',
  styleUrl: './cruise-listing.component.scss'
})
export class CruiseListingComponent {
routes = routes
}
