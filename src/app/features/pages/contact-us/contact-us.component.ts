import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  imports: [RouterLink],
  
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
routes = routes
}
