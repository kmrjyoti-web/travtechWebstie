import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  imports: [RouterLink],
  
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
routes = routes
}
