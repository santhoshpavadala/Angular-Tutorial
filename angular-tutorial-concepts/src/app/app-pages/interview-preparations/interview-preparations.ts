import { Component, ElementRef, Input, ViewChild, viewChild } from '@angular/core';
import { ViewMore } from "../../app-shared/view-more/view-more";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyCard } from '../../app-shared/my-card/my-card';

@Component({
  selector: 'app-interview-preparations',
  imports: [ViewMore, FormsModule, CommonModule, MyCard],
  templateUrl: './interview-preparations.html',
  styleUrl: './interview-preparations.scss',
})
export class InterviewPreparations  {
  name:string="Santhosh";
  inputName: string="Input text"
  imageUrl="https://cdn.pixabay.com/photo/2024/03/20/12/36/tokyo-skytree-8645455_1280.jpg";
  className = "ngClass";
  styles = {
    color: 'white',
    'background-color': '#996600',
    'font-size': '20px',
    padding: '5px'
  }


  @ViewChild('inputFocus') inputFocus!: ElementRef;
  focusInput() {
    this.inputFocus.nativeElement.focus();
  }
  @ViewChild('ipValue') ipValue!: ElementRef;
  inputRead: string = 'Enter Value';
  readValue() {
    this.inputRead = this.ipValue.nativeElement.value
  }
            
  ptext: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias omnis doloribus Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias omnis doloribus  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias omnis doloribus'
  plimit: number = 100

  constructor() {
    console.log(this.x);
  }
   x: number =10;

   save () {
    alert('Button clicked')
   }
}
