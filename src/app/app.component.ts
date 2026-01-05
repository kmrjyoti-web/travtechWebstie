import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, RouterOutlet } from '@angular/router';
import { CommonService } from './shared/common/common.service';
import { url } from './shared/models/models';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'DreamsTour';
  base = '';
  page = '';
  last = '';
  constructor(
    private common: CommonService,
    private router: Router,
  ) {
    setTheme('bs5');
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
    });
  }
  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
  }
}
