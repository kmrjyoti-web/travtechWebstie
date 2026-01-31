import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cruise-booking-confirmation',
  imports: [RouterLink],
  
  templateUrl: './cruise-booking-confirmation.component.html',
  styleUrl: './cruise-booking-confirmation.component.scss'
})
export class CruiseBookingConfirmationComponent {
public routes= routes;
}
