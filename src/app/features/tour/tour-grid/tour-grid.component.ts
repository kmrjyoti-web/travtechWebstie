import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonCounterComponent } from '../../common/common-counter/common-counter.component';

@Component({
  selector: 'app-tour-grid',
  imports: [
    CommonModule,
    MatSliderModule,
    RouterLink,
    BsDatepickerModule,
    CommonCounterComponent
  ],
  
  templateUrl: './tour-grid.component.html',
  styleUrl: './tour-grid.component.scss'
})
export class TourGridComponent {
public routes=routes;
    time: Date | null = null; // Bind this to the p-calendar
    constructor(private router: Router) {
    }
  isMore : boolean[]=[false];
  value!: number;
  bsValue=new Date();
  startValue = 500;
  endValue = 3000;
  public isClassAdded: boolean[] = [false];
  public isSelected :boolean[]=[false];
  formatLabel(value: number): string {
    if (value >= 1000) {
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
