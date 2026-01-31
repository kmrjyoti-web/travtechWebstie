import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';

@Component({
  selector: 'app-hotel-list',
   imports: [
    CommonModule,
    MatSliderModule,
    RouterLink,
    BsDatepickerModule,
    CommonCounterComponent
  ],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class HotelListComponent {
  public routes=routes;
 bsValue =new Date();
 value!: number;
 public isClassAdded: boolean[] = [false];
 public isSelected :boolean[]=[false];
 rangeValues: number[] = [20, 80];
 public isMore : boolean[]=[false];
 startValue = 500;
 endValue = 3000;
 constructor (private router: Router){}
 formatLabel(value: number): string {
  if (value >= 100) {
    return Math.round(value) + '';
  }

  return `${value}`;
}
formatLabel1(value: number): string {
  if (value >= 5000) {
    return '$'+ Math.round(value / 5000) ;
  }

  return `$${value}`;
}


toggleClass(index: number){
  this.isClassAdded[index] = !this.isClassAdded[index]
}
selectClass(index:number):void{
 this.isSelected[index]=!this.isSelected[index];
}
showMore(index:number) : void {
  this.isMore[index]=!this.isMore[index];
}

}
