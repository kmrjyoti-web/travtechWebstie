import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

import { RouterLink } from '@angular/router';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, LightgalleryModule],
  
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  routes=routes;
     settings = {
        counter: false,
        plugins: [lgZoom, lgVideo],
      };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
}
