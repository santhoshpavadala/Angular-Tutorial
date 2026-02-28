import { JsonPipe } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { email, form, FORM_FIELD, required} from '@angular/forms/signals';

@Component({
  selector: 'app-signals',
  imports: [ JsonPipe], //FieldDirective
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



// Signal Login form example:
loginModel = signal({email: '', password: ''});
// loginForm = form(this.loginModal);
loginForm = form(this.loginModel, (schema)=>{
  required(schema.email,{ message: 'This is required'}),
  email(schema.email, {message: "Eamil format required"})
  required(schema.password, {message: 'Passowrd is required'})
})



}
