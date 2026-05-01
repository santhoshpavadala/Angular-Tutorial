import { Component } from '@angular/core';
import { ViewMore } from "../../app-shared/view-more/view-more";

@Component({
  selector: 'app-interview-preparations',
  imports: [ViewMore],
  templateUrl: './interview-preparations.html',
  styleUrl: './interview-preparations.scss',
})
export class InterviewPreparations  {

            
  ptext: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias omnis doloribus Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias omnis doloribus  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias omnis doloribus'
  plimit: number = 100

  constructor() {
    console.log(this.x);
  }
   x: number =10;
}
