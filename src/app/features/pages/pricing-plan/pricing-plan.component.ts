import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing-plan',
  imports: [RouterLink],
  
  templateUrl: './pricing-plan.component.html',
  styleUrl: './pricing-plan.component.scss'
})
export class PricingPlanComponent {
routes = routes
}
