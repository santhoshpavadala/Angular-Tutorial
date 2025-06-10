import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss'
})
export class DataBinding {
stringInterpolation: string='String Interpolation';
title={
  "name": "Santhosh",
  "age": 32
}
srcPath: string="https://cdn.pixabay.com/photo/2024/03/20/12/36/tokyo-skytree-8645455_1280.jpg";
className: string = "special"
Date: string = new Date().toLocaleString();
functionValue = "fnValue"
  functionCall() {
    return this.functionValue
  }

  // Property Binding
  isDisable: boolean =true;
  isHidden: boolean = false;

  // Class Binding
  isActive: boolean=true;
  isClassApply: boolean=true;
  cval:string='red';
  styleObject: object={
    color: 'white',
    background: 'grey',
    border: '2px solid white'
  }
  hasError: boolean=true;

  // Event Binding
  OnSubmit() {
    alert('Button Event fired')
  }
  counterValue: number=0
  increment() {
    this.counterValue+=1; //counterValue=counterValue+1
  }
  decrement() {
    this.counterValue-=1; //counterValue=counterValue-1
  }
  userName='xyz';
  changeName(e:any) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    this.userName=e.target.value;
  }

  // Two Way Data Binding - ngModel;
  city="Hyderabad";
  updateCity() {
    this.city="Bengalore"
  }

}
