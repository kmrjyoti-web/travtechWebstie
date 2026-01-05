import { Component, HostListener } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LightgalleryModule } from 'lightgallery/angular';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-details',
   imports: [CommonModule,RouterLink,CommonCounterComponent,MatSelectModule,BsDatepickerModule,
    LightgalleryModule,DatePickerModule,FormsModule
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {
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
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
   
  };
  
  // Configuration for the thumbnail slider
  thumbSliderConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: '.slider-for',
    dots: false,
    arrows: true,
    focusOnSelect: true,
    verticalSwiping: true,
    prevArrow: "<span class='slick-next'><i class='fa-solid fa-chevron-down'></i></span>",
    nextArrow: "<span class='slick-prev'><i class='fa-solid fa-chevron-up'></i></span>",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          vertical: false,
          slidesToShow: 2,
        },
      },
    ],


  };
  
  // Example slides data
  mainSlides = [
    'assets/img/cars/car-large-01.jpg',
    'assets/img/cars/car-large-02.jpg',
    'assets/img/cars/car-large-03.jpg',
    'assets/img/cars/car-large-04.jpg',
    'assets/img/cars/car-large-05.jpg',
  ];
  
  thumbSlides = [
    'assets/img/cars/car-thumb-01.jpg',
    'assets/img/cars/car-thumb-02.jpg',
    'assets/img/cars/car-thumb-03.jpg',
    'assets/img/cars/car-thumb-04.jpg',
    'assets/img/cars/car-thumb-05.jpg',
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
      src: 'assets/img/cars/car-large-01.jpg',
    },
    {
      src: 'assets/img/cars/gallery-car-lg-01.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-02.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-03.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-04.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-05.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-06.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-01.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-02.jpg',
    }
    ,
    {
      src: 'assets/img/cars/gallery-car-lg-03.jpg',
    }
    ,
    
  ];
  tabs = [
      { id: 'basic_info', label: 'Basic Info' },
      { id: 'specifications', label: 'Specifications' },
      { id: 'additional_service', label: 'Additional Service' },
      { id: 'description', label: 'Description' },
      { id: 'features', label: 'Features' },
      { id: 'location', label: 'Locations' },
      { id: 'faq', label: 'FAQ' },
      { id: 'gallery', label: 'Gallery' },
    ];
  
    activeTab: string = this.tabs[0].id ; // Default to the first tab
  
    @HostListener('window:scroll', [])
    onScroll(): void {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
    this.tabs.forEach((tab) => {
        const element = document.getElementById(tab.id);
        if (element) {
          const sectionTop = element.offsetTop - 100; // Adjust offset for fixed headers
          const sectionBottom = sectionTop + element.offsetHeight;
  
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            this.activeTab = tab.id;
          }
        }
      });
    }
  
  
    scrollTo(id: string): void {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.activeTab = id; // Update the active tab
      }
    }
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
  onSubmit() :void { 
    this.router.navigateByUrl('/car/car-details'); 
  }
  onSubmit1() :void { 
    this.router.navigateByUrl('/car/car-booking'); 
  }
  public galleryImages = [
      {
        thumbnail: 'assets/img/cars/gallery-car-01.jpg',
        large: 'assets/img/cars/gallery-car-lg-01.jpg',
      },
      {
        thumbnail: 'assets/img/cars/gallery-car-02.jpg',
        large: 'assets/img/cars/gallery-car-lg-02.jpg',
      },
      {
        thumbnail: 'assets/img/cars/gallery-car-03.jpg',
        large: 'assets/img/cars/gallery-car-lg-03.jpg',
      },
      {
        thumbnail: 'assets/img/cars/gallery-car-04.jpg',
        large: 'assets/img/cars/gallery-car-lg-04.jpg',
      },
      {
        thumbnail: 'assets/img/cars/gallery-car-05.jpg',
        large: 'assets/img/cars/gallery-car-lg-05.jpg',
      },
      {
        thumbnail: 'assets/img/cars/gallery-car-06.jpg',
        large: 'assets/img/cars/gallery-car-lg-06.jpg',
      }
    ];
     // TrackBy function for unique keys
  trackByFn(index: number, item: any): any {
    return item.large || index;
  }
}
