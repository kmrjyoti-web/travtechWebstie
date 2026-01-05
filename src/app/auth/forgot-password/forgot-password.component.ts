import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../shared/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink],
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
 routes=routes;
   constructor(
     private renderer:Renderer2
   ){}
   ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-light-200');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-light-200');
  }
}
