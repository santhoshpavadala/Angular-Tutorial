import { Component, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.scss'
})
export class Signals {
  // Normal Way
  signalVariable: string = "This is Angular";
  signalVariable2 = signal("Thi is Angualr Signal");
  rollno=signal('123');
  students = signal({name: "Santhosh", email:"abc@gmail.com"})
  city = signal(["Hyd", "Mumbai", "Pune"]);
  courseDuration: Signal<string> = signal("3 months");

  constructor() {
    // Normal Way
    setTimeout(() => {
      this.signalVariable = "This is React"
    }, 3000);

    // Signal Way
    setTimeout(() => {
      this.signalVariable2.set("This is React Data changed with Signal")
    }, 3000);
  }
  changesCity() {
    this.signalVariable2.set(".NET COURSE")
  }













}
