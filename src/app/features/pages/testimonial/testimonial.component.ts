import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  imports: [RouterLink],
  
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {
routes = routes
}
