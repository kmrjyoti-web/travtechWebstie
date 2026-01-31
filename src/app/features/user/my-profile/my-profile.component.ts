import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';



@Component({
  selector: 'app-my-profile',
  imports: [],
  
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
public routes =routes
}
