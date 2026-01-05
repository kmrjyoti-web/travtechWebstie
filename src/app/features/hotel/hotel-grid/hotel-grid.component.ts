import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';
import { MatSliderModule } from '@angular/material/slider';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-hotel-grid',
  imports: [CommonModule,RouterLink,CountUpModule,MatSliderModule
    ,CommonCounterComponent,BsDatepickerModule
  ],
  
  templateUrl: './hotel-grid.component.html',
  styleUrl: './hotel-grid.component.scss'
})
export class HotelGridComponent {
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
