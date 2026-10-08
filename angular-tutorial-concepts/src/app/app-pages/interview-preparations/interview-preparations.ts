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



custompipe = `
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 10): string {
    if (!value) return '';

    return value.length > limit
      ? value.slice(0, limit) + '...'
      : value;
  }
}`;

inputDecerator = `
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: '<h3>{{ name }}</h3><p>{{ role }}</p>'
})
export class UserCardComponent {
  @Input() name = '';
  @Input() role = '';
}


import { Component } from '@angular/core';
import { UserCardComponent } from './user-card.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [UserCardComponent],
 imports: [UserCardComponent],
  template: \`
    <app-user-card
      [name]="userName"
      [role]="userRole"
    />
  \`
})
export class ParentComponent {
  userName = 'Santhosh';
  userRole = 'Frontend Developer';
}
`;

changeDetection = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <h2>Count: {{ count }}</h2>
    <button (click)="increment()">Increment</button>
  \`
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
`

onPush = `
import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h2>{{ name() }}</h2>
  \`
})
export class UserComponent {
  name = input.required<string>();
}
`

markForCheck = `
import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: true,
  template: \`<p>{{ status }}</p>\`
})
export class StatusComponent {
  status = 'Waiting';

  constructor(private cdr: ChangeDetectorRef) {}

  updateStatus() {
    this.status = 'Completed';
    this.cdr.markForCheck();
  }
}`

signalChnageDetection = `
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-score',
  standalone: true,
  template: \`
    <p>Score: {{ score() }}</p>
    <button (click)="increase()">Increase</button>
  \`
})
export class ScoreComponent {
  score = signal(0);

  increase() {
    this.score.update(value => value + 1);
  }
}
`

serviceExample = `
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = [
    { id: 1, name: 'Ravi', role: 'Angular Developer' },
    { id: 2, name: 'Kiran', role: 'Frontend Developer' }
  ];

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {
    return this.employees.find(employee => employee.id === id);
  }
}




import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  template: \`
    @for (employee of employees; track employee.id) {
      <p>{{ employee.name }} - {{ employee.role }}</p>
    }
  \`
})
export class EmployeeListComponent implements OnInit {
  employees: { id: number; name: string; role: string }[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
}
`

hirarchialDI = `
import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message = 'Global notification';
}

@Component({
  selector: 'app-child',
  standalone: true,
  template: \`<p>{{ notification.message }}</p>\`
})
export class ChildComponent {
  constructor(public notification: NotificationService) {}
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  providers: [NotificationService],
  template: \`<app-child />\`
})
export class ParentComponent {}

`

resModifier = `
import { Component, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-example',
  standalone: true,
  template: \`<p>Example</p>\`
})
export class ExampleComponent {
  notification = inject(NotificationService, {
    optional: true,
    skipSelf: true
  });
}
`

injectionToken = `
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  production: boolean;
}

export const APP_CONFIG =
  new InjectionToken<AppConfig>('APP_CONFIG');
`

injectionToken2 = `
import { ApplicationConfig } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app-config';

const config: AppConfig = {
  apiUrl: 'https://api.example.com',
  production: false
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_CONFIG,
      useValue: config
    }
  ]
};
`

injectionToken3 = `
import { Component, inject } from '@angular/core';
import { APP_CONFIG } from './app-config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \`<p>{{ apiUrl }}</p>\`
})
export class DashboardComponent {
  private config = inject(APP_CONFIG);

  apiUrl = this.config.apiUrl;
}
`

singleTon = `
import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count = 0;

  increment() {
    this.count++;
  }
}

@Component({
  selector: 'app-counter-a',
  standalone: true,
  template: \`<button (click)="counter.increment()">A: {{ counter.count }}</button>\`
})
export class CounterAComponent {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'app-counter-b',
  standalone: true,
  template: \`<p>B: {{ counter.count }}</p>\`
})
export class CounterBComponent {
  constructor(public counter: CounterService) {}
}
`

routing = `
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
`

routing2 = `
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
`

routing3 = `
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/users">Users</a>
  <a routerLink="/login">Login</a>
</nav>

<router-outlet></router-outlet>
`

routing4 = `
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {}
`

routeParam = `
{
  path: 'users/:id',
  component: UserDetailsComponent
}

Read the route parameter
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template:\`<p>User ID: {{ userId }}</p>\`
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);

  userId = this.route.snapshot.paramMap.get('id');
}
`

routeParam2 = `
this.route.paramMap.subscribe(params => {
  this.userId = params.get('id');
});
`

queryParam = `
this.route.queryParamMap.subscribe(params => {
  const page = params.get('page');
  const search = params.get('search');
});

Navigate with query parameters:
this.router.navigate(['/users'], {
  queryParams: {
    page: 2,
    search: 'santhosh'
  }
});

To preserve existing query parameters during navigation:
this.router.navigate(['/users'], {
  queryParams: { page: 3 },
  queryParamsHandling: 'merge'
});
`

nestedRoutes = `
export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];
`

nestedRoutes2 = `
<header>Admin Panel</header>

<nav>
  <a routerLink="dashboard">Dashboard</a>
  <a routerLink="users">Users</a>
  <a routerLink="settings">Settings</a>
</nav>

<router-outlet></router-outlet>
`

lazyLoad = `
<p>Lazy-load a standalone component</p>
export const routes: Routes = [
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.component')
        .then(m => m.ReportsComponent)
  }
];


Lazy-load child routes
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}

admin.routes.ts

import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

Eager loading vs lazy loading
Eager loading	                                            |Lazy loading
Code is included in the initial application loading path.	|Code is loaded when the route is needed.
Useful for small, frequently accessed features.           |Useful for large or less frequently accessed features.
Can increase initial bundle size.	                        |Can reduce initial bundle size, but may add loading delay when a feature is first opened.
`

preLoad = `
import {
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';

provideRouter(
  routes,
  withPreloading(PreloadAllModules)
);
`

canActivate = `
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = !!localStorage.getItem('token');

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

Apply the guard to a route:
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
`

CanActivateChild = `
{
  path: 'admin',
  component: AdminLayoutComponent,
  canActivateChild: [authGuard],
  children: [
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    }
  ]
}
`

CanDeactivate = `
import { CanDeactivateFn } from '@angular/router';

export interface CanLeavePage {
  canLeave: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanLeavePage> =
  component => component.canLeave();


Component implementation:
export class EditUserComponent implements CanLeavePage {
  isDirty = false;

  canLeave(): boolean {
    return !this.isDirty ||
      confirm('You have unsaved changes. Leave this page?');
  }
}

Route configuration:
{
  path: 'edit-user',
  component: EditUserComponent,
  canDeactivate: [unsavedChangesGuard]
}
`

CanMatch = `
import { CanMatchFn } from '@angular/router';

export const featureFlagGuard: CanMatchFn = () => {
  return inject(FeatureFlagService).isEnabled('reports');
};
`

routeResolver = `
import { inject } from '@angular/core';
import {
  ResolveFn
} from '@angular/router';
import { UserService } from './user.service';

export const userResolver: ResolveFn<User> = route => {
  const userService = inject(UserService);
  const id = route.paramMap.get('id')!;

  return userService.getUserById(id);
};

Configure the resolver:
{
  path: 'users/:id',
  component: UserDetailsComponent,
  resolve: {
    user: userResolver
  }
}

Read resolved data:
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template: \`
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  \`
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);

  user = this.route.snapshot.data['user'] as User;
}
`

routeData = `
{
  path: 'reports',
  component: ReportsComponent,
  data: {
    title: 'Reports',
    permission: 'REPORT_VIEW'
  }
}

Read it from the activated route:
const title = this.route.snapshot.data['title'];

For page titles, Angular also supports the title route property:
{
  path: 'reports',
  component: ReportsComponent,
  title: 'Reports'
}
Angular's router can update the document title during navigation using this route configuration.
`

routerEvents = `
import { Component, inject } from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`<router-outlet />\`,
  imports: [RouterOutlet]
})
export class AppComponent {
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        console.log('Navigation completed:', event.urlAfterRedirects);
      });
  }
}
`

templateForm = `
Import FormsModule:
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {}

HTML:
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">

  <input
    type="email"
    name="email"
    ngModel
    required
  />

  <input
    type="password"
    name="password"
    ngModel
    required
  />

  <button type="submit">
    Login
  </button>

</form>

TypeScript:
import { NgForm } from '@angular/forms';

onSubmit(form: NgForm): void {
  console.log(form.value);
}

If the user enters:
Email: test@gmail.com
Password: 123456

form.value will contain approximately:
{
  email: 'test@gmail.com',
  password: '123456'
}
`

ngModel = `
<input
  name="username"
  [(ngModel)]="username"
/>

TypeScript:
username = '';

`

tempValidation = `
<div *ngIf="email.invalid && email.touched">

  <span *ngIf="email.errors?.['required']">
    Email is required
  </span>

  <span *ngIf="email.errors?.['email']">
    Enter a valid email
  </span>

</div>
`

reactiveForms = `
Example: 
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

Component:
loginForm = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),

  password: new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ])
});

Template:
<form
  [formGroup]="loginForm"
  (ngSubmit)="onSubmit()"
>

  <input
    type="email"
    formControlName="email"
  />

  <input
    type="password"
    formControlName="password"
  />

  <button
    type="submit"
    [disabled]="loginForm.invalid"
  >
    Login
  </button>

</form>
`

formGroup = `
Example:
loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')
});

Conceptually:
FormGroup
│
├── email → FormControl
│
└── password → FormControl

Get the complete form value:
console.log(this.loginForm.value);

Result:
{
  email: 'test@gmail.com',
  password: '123456'
}

Access an individual control:
this.loginForm.get('email');
`

formBuilder = `
import {
  FormBuilder,
  Validators
} from '@angular/forms';

private fb = inject(FormBuilder);

loginForm = this.fb.group({
  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],

  password: [
    '',
    [
      Validators.required,
      Validators.minLength(6)
    ]
  ]
});
`

validators = `
username: [
  '',
  [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]
]

Password:
password: [
  '',
  [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/
    )
  ]
]
`

displayValidation = `
email: [
  '',
  [
    Validators.required,
    Validators.email
  ]
]

<input
  type="email"
  formControlName="email"
/>

@if (
  loginForm.get('email')?.invalid &&
  loginForm.get('email')?.touched
) {
  @if (loginForm.get('email')?.hasError('required')) {
    <small>Email is required</small>
  }

  @if (loginForm.get('email')?.hasError('email')) {
    <small>Invalid email address</small>
  }
}
`

setValue = `
userForm = this.fb.group({
  name: [''],
  email: [''],
  phone: ['']
});

this.userForm.setValue({
  name: 'Santhosh',
  email: 'santhosh@gmail.com',
  phone: '9999999999'
});

If you omit a control:
this.userForm.setValue({
  name: 'Santhosh',
  email: 'santhosh@gmail.com'
});

Angular throws an error because phone is missing.
`

patchValue = `
this.userForm.patchValue({
  name: 'Santhosh',
  email: 'santhosh@gmail.com'
});

this.employeeService.getEmployee(id)
  .subscribe(employee => {
    this.employeeForm.patchValue(employee);
  });
`

FormArray = `
Employee
  Name
  Email

Skills
  Angular
  TypeScript
  RxJS
  React

The user can click: + Add Skill button

and dynamically add another input.

FormArray:

skills = this.fb.array([
  this.fb.control('')
]);

Complete example:
employeeForm = this.fb.group({
  name: [''],
  skills: this.fb.array([
    this.fb.control('')
  ])
});

Getter:
get skills() {
  return this.employeeForm.controls.skills;
}

Add skill:
addSkill(): void {
  this.skills.push(
    this.fb.control('')
  );
}

Remove skill:
removeSkill(index: number): void {
  this.skills.removeAt(index);
}

Template:
<form [formGroup]="employeeForm">

  <input formControlName="name" />

  <div formArrayName="skills">

    @for (
      skill of skills.controls;
      track $index
    ) {
      <input [formControlName]="$index" />

      <button
        type="button"
        (click)="removeSkill($index)"
      >
        Remove
      </button>
    }

  </div>

  <button
    type="button"
    (click)="addSkill()"
  >
    Add Skill
  </button>

</form>
`

nestedFormGrp = `
employeeForm = this.fb.group({
  name: [''],
  email: [''],

  address: this.fb.group({
    city: [''],
    state: [''],
    pincode: ['']
  })
});

Template:
<form [formGroup]="employeeForm">

  <input formControlName="name">
  <input formControlName="email">

  <div formGroupName="address">
    <input formControlName="city">
    <input formControlName="state">
    <input formControlName="pincode">
  </div>
</form>

This structure can map naturally to an API request:
{
  name: 'Santhosh',
  email: 'santhosh@gmail.com',
  address: {
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001'
  }
}
`

valueChanges = `
this.employeeForm
  .get('name')
  ?.valueChanges
  .subscribe(value => {
    console.log('Name changed:', value);
  });
`

searchValuechanges = `
this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged()
  )
  .subscribe(searchTerm => {
    this.searchUsers(searchTerm);
  });
`

statusChanges = `
this.employeeForm.statusChanges
  .subscribe(status => {
    console.log(status);
  });
`

customValidators = `
import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export function noSpacesValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;

  if (typeof value === 'string' && value.includes(' ')) {
    return {
      noSpaces: true
    };
  }

  return null;
}

Use it:
username: [
  '',
  [
    Validators.required,
    noSpacesValidator
  ]
]
`

crossfieldValidation = `
import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export function passwordMatchValidator(
  group: AbstractControl
): ValidationErrors | null {

  const password = group.get('password')?.value;
  const confirmPassword =
    group.get('confirmPassword')?.value;

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

Apply it:
registerForm = this.fb.group(
  {
    password: ['', Validators.required],

    confirmPassword: [
      '',
      Validators.required
    ]
  },
  {
    validators: passwordMatchValidator
  }
);

Check:
registerForm.hasError('passwordMismatch')
`

asyncValid = `
export function usernameAvailableValidator(
  userService: UserService
) {
  return (control: AbstractControl) => {

    return userService
      .isUsernameAvailable(control.value)
      .pipe(
        map(isAvailable =>
          isAvailable
            ? null
            : { usernameTaken: true }
        )
      );
  };
}
`

FormSubmitApi = `
onSubmit(): void {

  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  const employee =
    this.employeeForm.getRawValue();

  this.employeeService
    .createEmployee(employee)
    .subscribe({
      next: response => {
        console.log('Employee created', response);
      },

      error: error => {
        console.error(
          'Failed to create employee',
          error
        );
      }
    });
}
`
formSave = `
<button
  type="submit"
  [disabled]="employeeForm.invalid"
>
  Save
</button>

And define validators:
employeeForm = this.fb.group({
  name: [
    '',
    Validators.required
  ],

  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],

  phone: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]
  ]
});
`

compHttp = `
export class EmployeeComponent {

  private http = inject(HttpClient);

  loadEmployees() {
    this.http.get('/api/employees')
      .subscribe(...);
  }
}
`

serviceHttp = `
Service:
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get<Employee[]>('/api/employees');
  }
}

Component:
export class EmployeeComponent {

  private employeeService = inject(EmployeeService);

  loadEmployees() {
    this.employeeService
      .getEmployees()
      .subscribe(employees => {
        console.log(employees);
      });
  }
}
`

configHttp = `
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};

Then inject HttpClient:
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

private http = inject(HttpClient);
`
}
