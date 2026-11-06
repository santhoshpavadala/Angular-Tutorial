import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, FormArray, FormBuilder, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './forms.html',
  styleUrl: './forms.scss'
})
export class Forms implements OnInit{
  // Reactive Forms:
  login = new FormGroup({ // Inside form ground we can pass the form controls
    usname: new FormControl,
    pswd: new FormControl
  });
  // Reactive Forms: validators
  register=new FormGroup({
    userName: new FormControl( 'Default', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('@email', [Validators.required, Validators.email])
  })
  // Reactive Forms: formArrays
  testMobile= new FormGroup({
  mobileNumbers: new FormArray(
    [
      new FormControl(null, Validators.required) // Here we can pass the default value for form control
    ]
  )
  })
  // Reactive Forms: Custom Validators
  custValidForm= new FormGroup(
    {
      password: new FormControl(null, [Validators.required, this.upperCaseTest])
    }
  )
  upperCaseTest(custom:any) {
    let pattern = /[A-Z]/
    if(pattern.test(custom.value)){ //pattern.test is used to test the condition of A-Z Capitals is there or not in string
      return null
    }
    return {'noUppercase': true}
  }
  showCustom() {
    console.log(this.custValidForm, 'custValidForm');
  }

  // Reactive Forms: Async Validators
  asyncValidForm = new FormGroup(
    {
      ascuname: new FormControl(null, Validators.required, this.usernameCheck)
    }
  )


  usernameCheck(control:any): Promise<any> {
    let response = new Promise(
      
      (resolve, reject)=>{
        let users = ["user1", "user2", "user3"]

        let name = control.value;
        // if(this.users.indexOf(name)>=0) {
        //   resolve({"duplicateUser": true})
        // } else {
        //   resolve(null)
        // }

        setTimeout(()=>{
        if(users.indexOf(name)>=0) {
          resolve({"duplicateUser": true})
        } else {
          resolve(null)
        }
        }, 10000)
      }
    )
    return response;
  } 




  // Reactive Forms: formBuilders
  fbForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  // Reactive Forms: formbuilder
  this.fbForm=this.fb.group(
    {
      uname: [null, Validators.required], // if you give array [], it will creates formcontrol instance automatically
      newName: new FormControl(null, Validators.required), // we can also use the syntax like this same like formgroup and controls
      new1Name: this.fb.control(null, Validators.required), // other way but its deprecated in new versions
      fbEmail: ["xyz@email.com", Validators.required],
      // fbMobile: [],
      fbMobile: this.fb.array(
        [
          // new FormControl(), // alternate way to create control
          [],
          []
        ]
      )
    }
  )
  }

  get fbMobile(): FormArray {
    return this.fbForm.get('fbMobile') as FormArray;
  }




  submit(usName:any, pwd:any, group:any) {
    console.log(usName, 'useranme');
    console.log(pwd, 'pwd valid');
    console.log(pwd.valid, 'pwd valid');
    console.log(group, 'group');
  }

  showErr(uerr:any, perr:any){
    console.log(uerr, 'username error');
    console.log(perr, 'password error');
  }

  loginSubmit(form:any) {
    console.log(form, 'login data');
    console.log(form.value, 'login form values');
    console.log(form.value.userName, 'login username');
    // // Set Value
    form.setValue(  // In this set value we need to pass all keys to satisfy of form values object
      {
        "userName": "Santhosh",
        "password": "Sant"
      }
    )
    console.log(form.value, 'login form values');
    // Patch value
    form.control.patchValue( // In this patch value, we use control path also and we need to pass any required keys to set & satisfy of form values object
      {
        "userName": "Santhosh",
      }
    )
  }

  // Reactive Forms Examples start
  formGrp() {
      console.log(this.login, 'Login Form grp');
      console.log(this.login.value, 'Login Form grp value');
      console.log(this.login.controls['usname'], 'Login Form grp username');
      console.log(this.login.controls['pswd'], 'Login Form grp password');
    }
    valid() {
      console.log(this.register, 'Register Data');
    }


  // Reactive Forms: formArrays
    // ✅ Getter (important)
  get mobileNumbers(): FormArray {
    return this.testMobile.get('mobileNumbers') as FormArray;
  }
    // ➕ Add new mobile input
  addMobileNumber() {
    console.log(this.testMobile, 'test-mobile');
    
    this.mobileNumbers.push(new FormControl(''));
  }

  // ➖ Remove mobile input by index
  removeMobileNumber(index: number) {
    this.mobileNumbers.removeAt(index);
  }


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

}
