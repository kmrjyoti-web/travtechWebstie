
import { routes } from './../../../../shared/routes/routes';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-setting',
  imports: [RouterLink, MatSelectModule],
  
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
routes = routes
}
