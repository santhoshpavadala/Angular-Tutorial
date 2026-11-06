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

    signalEx = `
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <h2>Count: {{ count() }}</h2>

    <button (click)="increment()">
      Increment
    </button>
  \`
})
export class CounterComponent {
  count = signal(0);

  increment(): void {
    this.count.update(value => value + 1);
  }
}
`

writableSignal = `
import { signal } from '@angular/core';

const username = signal('Santhosh');

console.log(username()); // Santhosh

To change the value:
username.set('Angular Developer');

To derive a new value from the current one:
username.update(value => value.toUpperCase());

The current value becomes: ANGULAR DEVELOPER
`

computedSignal = `
import { computed, signal } from '@angular/core';

const price = signal(1000);
const quantity = signal(3);

const total = computed(() => price() * quantity());

console.log(total()); // 3000

quantity.set(5);

console.log(total()); // 5000
`

shopingCartEx = `
export class CartComponent {
  price = signal(500);
  quantity = signal(2);

  totalPrice = computed(
    () => this.price() * this.quantity()
  );
}

<p>Quantity: {{ quantity() }}</p>
<p>Total: {{ totalPrice() }}</p>

<button (click)="quantity.update(q => q + 1)">
  Add one
</button>
`

effectSignal = `
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`<p>Count: {{ count() }}</p>\`
})
export class CounterComponent {
  count = signal(0);

  constructor() {
    effect(() => {
      console.log('Current count:', this.count());
    });
  }

  increment(): void {
    this.count.update(value => value + 1);
  }
}
`

signalInput = `
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`<h3>{{ name() }}</h3>\`
})
export class UserCardComponent {
  name = input.required<string>();
}

Parent template:
<app-user-card [name]="userName" />

Here, name() reads the input signal.
`

signalOutput = `
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-save-button',
  standalone: true,
  template: \`
    <button (click)="save.emit()">Save</button>
  \`
})
export class SaveButtonComponent {
  save = output<void>();
}

Parent:
<app-save-button (save)="onSave()" />
`

toSignal = `
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users',
  standalone: true,
  template: \`
    @for (user of users(); track user.id) {
      <p>{{ user.name }}</p>
    }
  \`
})
export class UsersComponent {
  private userService = inject(UserService);

  users = toSignal(
    this.userService.getUsers(),
    { initialValue: [] as User[] }
  );
}
`

toObservable = `
import { signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

searchTerm = signal('');

searchTerm$ = toObservable(this.searchTerm);

You can now apply RxJS operators:
results$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.userService.search(term))
);
`

signalStatemanagement = `
import { Injectable, signal, computed } from '@angular/core';

interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private usersState = signal<User[]>([]);

  users = this.usersState.asReadonly();

  userCount = computed(() => this.usersState().length);

  setUsers(users: User[]): void {
    this.usersState.set(users);
  }

  addUser(user: User): void {
    this.usersState.update(users => [...users, user]);
  }
}

A component can read:
users = this.userState.users;
count = this.userState.userCount;

Template:
<p>Total users: {{ count() }}</p>

@for (user of users(); track user.id) {
  <p>{{ user.name }}</p>
}
`

zonelessCD = `
import { ApplicationConfig } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
`

}
