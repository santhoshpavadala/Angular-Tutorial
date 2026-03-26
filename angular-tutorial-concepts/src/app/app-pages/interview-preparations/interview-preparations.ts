import { Component } from '@angular/core';

@Component({
  selector: 'app-interview-preparations',
  imports: [],
  templateUrl: './interview-preparations.html',
  styleUrl: './interview-preparations.scss',
})
export class InterviewPreparations  {

  constructor() {
    console.log(this.x);
  }
   x: number =10;
}
