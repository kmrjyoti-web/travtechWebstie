import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [RouterLink],
  
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
public routes =routes
}
