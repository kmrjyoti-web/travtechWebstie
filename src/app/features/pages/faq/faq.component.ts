
import { routes } from './../../../shared/routes/routes';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  imports: [RouterLink],
  
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
routes = routes
}
