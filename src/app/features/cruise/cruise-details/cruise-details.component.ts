import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { CommonModule } from '@angular/common';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LightgalleryModule } from 'lightgallery/angular';
@Component({
  selector: 'app-cruise-details',
   imports: [CommonModule,RouterLink,CommonCounterComponent,MatSelectModule,BsDatepickerModule,
    LightgalleryModule
  ],
  templateUrl: './cruise-details.component.html',
  styleUrl: './cruise-details.component.scss'
})
export class CruiseDetailsComponent {
  public routes=routes;
  isLess =true;
  isMore:boolean[] =[false];
  time: Date | null = null; // Bind this to the p-calendar
    constructor(private router: Router) {
    }
    bsValue=new Date();
    public isClassAdded: boolean[] = [false];
    toreset=true;
    navContainer?: string;
   
  // Configuration for the main slider
  mainSliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    margin:10,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav', // Link with the thumbnail slider
    prevArrow: "<div class='owl-nav'><button type= 'button' role='presentation' class='owl-prev'><i class='fa-solid fa-chevron-left'></i></button></div>",
    nextArrow: "<div class='owl-nav'><button type= 'button' role='presentation' class='owl-next'><i class='fa-solid fa-chevron-right'></i></button></div>",
  };
  
  // Configuration for the thumbnail slider
  thumbSliderConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    margin:10,
    vertical: false,
    asNavFor: '.slider-fors', // Link with the main slider
    dots: false,
    arrows: false,
    focusOnSelect: true,
    prevArrow: "<span class='slick-next'><i class='fa-solid fa-chevron-right'></i></span>",
    nextArrow: "<span class='slick-prev'><i class='fa-solid fa-chevron-left'></i></span>",

  };
  
  // Example slides data
  mainSlides = [
    'assets/img/cruise/cruise-large-01.jpg',
    'assets/img/cruise/cruise-large-02.jpg',
    'assets/img/cruise/cruise-large-03.jpg',
    'assets/img/cruise/cruise-large-04.jpg',
    'assets/img/cruise/cruise-large-05.jpg',
    'assets/img/cruise/cruise-large-06.jpg',
  ];
  
  thumbSlides = [
    'assets/img/cruise/cruise-thumb-01.jpg',
    'assets/img/cruise/cruise-thumb-02.jpg',
    'assets/img/cruise/cruise-thumb-03.jpg',
    'assets/img/cruise/cruise-thumb-04.jpg',
    'assets/img/cruise/cruise-thumb-05.jpg',
    'assets/img/cruise/cruise-thumb-06.jpg',
  ];

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
      src: 'assets/img/cruise/cruise-large-04.jpg',
    },
    {
      src: 'assets/img/cruise/cruise-large-01.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-02.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-03.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-04.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-05.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-01.jpg',
    }
    ,{
      src: 'assets/img/cruise/cruise-large-04.jpg',
    },
    {
      src: 'assets/img/cruise/cruise-large-01.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-02.jpg',
    }
    ,
    {
      src: 'assets/img/cruise/cruise-large-03.jpg',
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
    this.router.navigateByUrl('/cruise/cruise-booking'); 
  }
}
