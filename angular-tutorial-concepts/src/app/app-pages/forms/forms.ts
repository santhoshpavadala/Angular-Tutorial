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


  
  


}
