import { Component } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { routes } from '../../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { CommonModule } from '@angular/common';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-flight-details',
  imports: [CommonModule,RouterLink,CommonCounterComponent,MatSelectModule,BsDatepickerModule,
    LightgalleryModule
  ],
  
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent {
  public routes=routes;
  isLess =true;
  isMore:boolean[] =[false];
  isChecked2=false;
  isChecked3=false;
  time: Date | null = null; // Bind this to the p-calendar
    constructor(private router: Router) {
    }
    bsValue=new Date();
    public isClassAdded: boolean[] = [false];
    toreset=true;
    navContainer?: string;
   

   settings = {
      counter: false,
      plugins: [lgZoom, lgVideo],
    };
  private lightGallery!: LightGallery;
    private needRefresh = false;
    ngAfterViewChecked(): void {
      if (this.needRefresh) {
        this.lightGallery.refresh();
        this.needRefresh = false;
      }
    }
    onInit = (detail: { instance: LightGallery }): void => {
      this.lightGallery = detail.instance;
    };
      images = [
    {
      src: 'assets/img/flight/flight-large-04.jpg',
    },
    {
      src: 'assets/img/flight/flight-large-01.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-02.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-03.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-04.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-05.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-01.jpg',
    }
    ,{
      src: 'assets/img/flight/flight-large-04.jpg',
    },
    {
      src: 'assets/img/flight/flight-large-01.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-02.jpg',
    }
    ,
    {
      src: 'assets/img/flight/flight-large-03.jpg',
    }
    ,
  ];
  gallerySettings = {
    counter: true,
    download: true
  };

  toggleClass(index: number){
    this.isClassAdded[index] = !this.isClassAdded[index]
  }
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
  showMore() : void{
    this.isLess=!this.isLess;
  }
  showLess(index:number) : void{
    this.isMore[index]=!this.isMore[index];
  }
  onSubmit1() :void { 
    this.router.navigateByUrl('/flight/flight-booking'); 
  }
  onCheck() :void{
    this.isChecked2=false;
    this.isChecked3=false;
  }
  onCheck2() :void{
    this.isChecked2=true;
    this.isChecked3=false;
  }
  onCheck3() :void{
    this.isChecked3=true;
    this.isChecked2=false;
  }
}
