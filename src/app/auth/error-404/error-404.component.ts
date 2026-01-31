import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-error-404',
  imports: [RouterLink],
  
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss'
})
export class Error404Component {
routes = routes
constructor(
  private renderer:Renderer2
){}
ngOnInit(): void {
 this.renderer.addClass(document.body, 'bg-primary-transparent');
}
ngOnDestroy(): void {
 this.renderer.removeClass(document.body, 'bg-primary-transparent');
}
}
