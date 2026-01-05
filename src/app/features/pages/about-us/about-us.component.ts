import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-about-us',
  imports: [RouterLink, CountUpModule],
  
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
routes = routes

}
