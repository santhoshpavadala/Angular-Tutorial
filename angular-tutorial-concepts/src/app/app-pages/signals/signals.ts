import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, OnInit, Signal, signal } from '@angular/core';
import { email, form, FORM_FIELD, required} from '@angular/forms/signals';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
@Component({
  selector: 'app-signals',
  imports: [ JsonPipe], //FieldDirective
  templateUrl: './signals.html',
  styleUrl: './signals.scss'
})
export class Signals implements OnInit {
  // Normal Way
  signalVariable: string = "This is Angular";
  signalVariable2 = signal("Thi is Angualr Signal");
  rollno=signal('123');
  students = signal({name: "Santhosh", email:"abc@gmail.com"})
  city = signal(["Hyd", "Mumbai", "Pune"]);
  courseDuration: Signal<string> = signal("3 months");

  constructor( private http: HttpClient) {
    effect(()=>{
      console.log('Effect due to count signal is triggered', this.count);
    })
    effect(()=>{
      console.log('Effect due to color signal is triggered', this.colors);
    })
    

    // Normal Way
    setTimeout(() => {
      this.signalVariable = "This is React"
    }, 3000);

    // Signal Way
    setTimeout(() => {
      this.signalVariable2.set("This is React Data changed with Signal")
    }, 10000);
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

// count: number = 0;
  count = signal(0);
  colors = signal(['red', 'green']);

  a = signal(10);
  b= signal(20);
  c=computed(()=>this.a() + this.b())

ngOnInit(): void {
  console.log(this.c());
  this.a.set(20)
  console.log(this.c());
  
}




  increment() {
    // --------- Writable signals --------------
    // this.count = this.count+1;
    // this.count.set(this.count() + 1);
    this.count.update(val=>val+1);
    this.colors.update(value=>[...value, "blue"]);
    // console.log(this.colors(), 'array signal');
  }

    // --------- Computed signals --------------
    length = signal(20);
    breadth = signal(40);
    area = computed(()=>this.length() * this.breadth());
    getArea() {
      this.length.set(30);
    }


}
