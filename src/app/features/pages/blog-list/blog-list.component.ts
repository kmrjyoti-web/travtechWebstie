import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink],
  
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
routes = routes
}
