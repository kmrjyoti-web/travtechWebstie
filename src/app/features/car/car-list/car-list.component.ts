import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-list',
imports: [
    CommonModule,
    MatSliderModule,
    RouterLink,
    BsDatepickerModule,
    DatePickerModule,
    FormsModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent {
  public routes=routes;
    time: Date | null = null;
    constructor(private router: Router) {
    }
  isMore : boolean[]=[false];
  value!: number;
  bsValue=new Date();
  startValue = 500;
  endValue = 3000;
  isChecked4=false;
  isChecked5=false;
  isChecked6=false;
  toreset=true; 
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
