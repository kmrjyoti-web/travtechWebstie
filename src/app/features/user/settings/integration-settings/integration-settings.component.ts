import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integration-settings',
  imports: [RouterLink],
  
  templateUrl: './integration-settings.component.html',
  styleUrl: './integration-settings.component.scss'
})
export class IntegrationSettingsComponent {
routes=routes
}
