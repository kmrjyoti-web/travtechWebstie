import { Component } from '@angular/core';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { LightgalleryModule } from 'lightgallery/angular';


@Component({
  selector: 'app-home-2',
   imports: [
    CommonModule,
    CountUpModule,
    RouterLink,
    CommonCounterComponent,
    BsDatepickerModule,
    DatePickerModule,
    FormsModule,
    LightgalleryModule
  ],
  
  templateUrl: './home-2.component.html',
  styleUrl: './home-2.component.scss'
})
export class Home2Component {
  public routes=routes
  time: Date | null = null; // Bind this to the p-calendar
  constructor(private router: Router) {
  }
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
  navContainer?: string;
 
// Configuration for the main slider


// Configuration for the thumbnail slider



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
  }
  toggleClass(index: number){
    this.isClassAdded[index] = !this.isClassAdded[index]
  }
  selectClass(index:number):void{
   this.isSelected[index]=!this.isSelected[index];
  }
}
