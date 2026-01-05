import { Component } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';
import { routes } from '../../../shared/routes/routes';
import { LightgalleryModule } from 'lightgallery/angular'
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import {DestinationCardComponent} from "../../widget/destinations/ui/destination-list/destination-card.component";
import {DestinationSectionComponent} from "../../widget/destinations/ui/destination-section/destination-section.component";
import {
  PreferencesCardSectionComponent
} from "../../widget/preferences-card/ui/preferences-card-section/preferences-card-section.component";
import {BenefitSectionComponent} from "../../widget/benefit-section/ui/benefit-section/benefit-section.component";
import {
  PopularToursSectionComponent
} from "../../widget/popular-tours/ui/popular-tours-section/popular-tours-section.component";
import {
  BenefitSection2SectionComponent
} from "../../widget/benefit-section-2/ui/benefit-section-2-section/benefit-section-2-section.component";
import {
  TrendingPlacesSectionComponent
} from "../../widget/trending-places/ui/trending-places-section/trending-places-section.component";
import {
  AboutSectionSectionComponent
} from "../../widget/about-section/ui/about-section-section/about-section-section.component";
import {OurExpertSectionComponent} from "../../widget/our-expert/ui/our-expert-section/our-expert-section.component";
import {
  ClientSectionSectionComponent
} from "../../widget/client-section/ui/client-section-section/client-section-section.component";
import {UpdateSectionComponent} from "../../widget/update-section/ui/update-section/update-section.component";
import {FaqSectionComponent} from "../../widget/faq-section/ui/faq-section/faq-section.component";
import {BlogSectionComponent} from "../../widget/blog-section/ui/blog-section/blog-section.component";
import {
  SupportSliderSectionComponent
} from "../../widget/support-slider/ui/support-slider-section/support-slider-section.component";
import {HeroSectionComponent} from "../../widget/hero/ui/hero-section/hero-section.component";
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CountUpModule,
    RouterLink,
    LightgalleryModule,
    CommonCounterComponent,
    BsDatepickerModule,
    DatePickerModule,
    FormsModule,
    DestinationCardComponent,
    DestinationSectionComponent,
    PreferencesCardSectionComponent,
    BenefitSectionComponent,
    PopularToursSectionComponent,
    BenefitSection2SectionComponent,
    TrendingPlacesSectionComponent,
    AboutSectionSectionComponent,
    OurExpertSectionComponent,
    ClientSectionSectionComponent,
    UpdateSectionComponent,
    FaqSectionComponent,
    BlogSectionComponent,
    SupportSliderSectionComponent,
    HeroSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  public routes=routes;
  blogRoutes = {
    blogGrid: ['/blog/grid'],
    blogDetails: ['/blog/details'],

    // add other keys if you use them
  };
  time: Date | null = null; // Bind this to the p-calendar
  constructor(private router: Router) {
  }
  isTabed=false;
  isTabed1=true;
  isTabed2=false;
  isTabed3=false;
  isTabed4=false;
  bsValue=new Date();
  isChecked=false;
  isChecked2=false;
  isChecked3=false;
  isChecked4=false;
  isChecked5=false;
  isChecked6=false;
  toreset=true;
  public isClassAdded: boolean[] = [false];
  public isSelected :boolean[]=[false];
  // public placeSlider!:OwlOptions
  // public imageSlider!:OwlOptions
  // public bannerSlider: OwlOptions = {
  //   loop: true,
  //     margin: 0,
  //     nav: false,
  //     dots: true,
  //     autoplay: false,
  //     smartSpeed: 2000,
  //     autoWidth:true, 
  //     animateOut: "custom-slide-out-up",
  //     animateIn: "custom-slide-in-up",

  //     responsive: {
  //       0: {
  //         items: 1,
  //       },

  //       550: {
  //         items: 1,
  //       },
  //       1200: {
  //         items: 1,
  //       },
  //       1400: {
  //         items: 1,
  //       },
  //     },
  // };
  // public destinationSlider: OwlOptions = {
  //   loop: true,
  //     margin: 24,
  //     nav: true,
  //     dots: false,
  //     autoplay: false,
  //     smartSpeed: 2000,
  //     navText: [
  //       "<i class='fa-solid fa-chevron-left'></i>",
  //       "<i class='fa-solid fa-chevron-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 1,
  //       },
  //       576: {
  //         items: 2,
  //       },
  //       992: {
  //         items: 4,
  //       },
  //       1200: {
  //         items: 4,
  //       },
  //     },
  // }
  // public expertSlider :OwlOptions ={
  //     loop: true,
  //     margin: 24,
  //     nav: true,
  //     dots: false,
  //     autoplay: false,
  //     smartSpeed: 2000,
  //     navText: [
  //       "<i class='fa-solid fa-chevron-left'></i>",
  //       "<i class='fa-solid fa-chevron-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 1,
  //       },
  //       576: {
  //         items: 2,
  //       },
  //       992: {
  //         items: 3,
  //       },
  //       1200: {
  //         items: 4,
  //       },
  //     },
  // }
  // public clientSlider : OwlOptions ={
  //   loop: true,
  //     margin: 24,
  //     nav: false,
  //     dots: false,
  //     autoplay: true,
  //     smartSpeed: 2000,
  //     navText: [
  //       "<i class='fa-solid fa-chevron-left'></i>",
  //       "<i class='fa-solid fa-chevron-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 2,
  //       },
  //       576: {
  //         items: 3,
  //       },
  //       992: {
  //         items: 4,
  //       },
  //       1200: {
  //         items: 5,
  //       },
  //       1400: {
  //         items: 7,
  //       },
  //     },
  // }
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
  onSubmit() :void { 
    this.router.navigateByUrl('/hotel/hotel-grid'); 
  }
  onSubmit2() :void { 
   this.router.navigateByUrl('/flight/flight-grid'); 
  }
  onSubmit3() :void { 
  this.router.navigateByUrl('/car/car-grid'); 
  }
  onSubmit4() :void { 
  this.router.navigateByUrl('/cruise/cruise-grid'); 
  }
  onSubmit5() :void { 
  this.router.navigateByUrl('/tour/tour-grid'); 
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
  onCheck4() :void{
    this.isChecked4=true;
    this.isChecked5=false;
    this.isChecked6=false;
  }
  onCheck5() :void{
    this.isChecked5=true;
    this.isChecked6=false;
    this.isChecked4=false ;
    this.toreset=false;
  }
  onCheck6() :void{
    this.isChecked4=false;
    this.isChecked6=true;
    this.isChecked5=false;
    this.toreset=false;
  }
  reset() :void{
    this.isChecked4=false;                                         
    this.isChecked5=false;
    this.isChecked6=false;
    this.toreset=true;
  }
  ngOnInit(): void {
    // Set the default time to 10:30 AM
    const defaultTime = new Date();
    defaultTime.setHours(10, 30, 0, 0); // Set hours, minutes, seconds, milliseconds
    this.time = defaultTime;
    // this.placeSlider ={
    //   loop: false,
    //     margin: 24,
    //     nav: true,
    //     dots: false,
    //     smartSpeed: 2000,
    //     autoplay: false,
    //     navText: [
    //       "<i class='isax isax-arrow-left-2'></i>",
    //       "<i class='isax isax-arrow-right-3'></i>",
    //     ],
    //     responsive: {
    //       0: {
    //         items: 1,
    //       },
    //       550: {
    //         items: 1,
    //       },
    //       768: {
    //         items: 2,
    //       },
    //       992: {
    //         items: 3,
    //       },
    //       1200: {
    //         items: 4,
    //       },
    //     },
    // }
    //  this.imageSlider ={
    //   loop: true,
    //     margin: 20,
    //     nav: true,
    //     dots: true,
    //     smartSpeed: 2000,
    //     autoplay: false,
    //     navText: [
    //       '<i class="fa-solid fa-chevron-left"></i>',
    //       '<i class="fa-solid fa-chevron-right"></i>',
    //     ],
    //     responsive: {
    //       0: {
    //         items: 1,
    //       },
    //       550: {
    //         items: 1,
    //       },
    //       768: {
    //         items: 1,
    //       },
    //       1000: {
    //         items: 1,
    //       },
    //     },
    // }
  }
 openTab():void{
  this.isTabed = true;
  this.isTabed2=false;
 }
 openTab1():void{
  this.isTabed1 = true;
 }
 openTab2():void{
  this.isTabed2 = true;
 }
 openTab3():void{
  this.isTabed3 = true;
 }
 openTab4():void{
  this.isTabed4 = true;
 }
 toggleClass(index: number){
  this.isClassAdded[index] = !this.isClassAdded[index]
}
selectClass(index:number):void{
 this.isSelected[index]=!this.isSelected[index];
}
}
