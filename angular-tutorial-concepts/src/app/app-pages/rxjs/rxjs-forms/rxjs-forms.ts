import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { combineLatest, debounceTime } from 'rxjs';

@Component({
  selector: 'app-rxjs-forms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rxjs-forms.html',
  styleUrl: './rxjs-forms.scss',
})
export class RxjsForms implements OnInit {
  userform!: FormGroup;
  passwordMismatch= false;
  searchResult:any[]=[];

  searchControl:FormControl = new FormControl("ABC");

  constructor(private fb: FormBuilder) {
    this.userform=this.fb.group({
      name: ['', Validators.required],
      subscribe: [false],
      email: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      age: [''],
      drivingLicense: [''],
      country: [''],
      currency: [''],
      search: ['']
    })
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.userform.controls['confirmPassword'].disable();
    // ValueChange: form value changes examples on input type enters
    this.userform.controls['name'].valueChanges.subscribe((res:string)=>{
      // debugger;
      console.log(res, 'with react form control');
    })
    this.userform.valueChanges.subscribe((formValue:any)=>{
      console.log(formValue, 'Comple form value log');
    })

    this.userform.controls['password'].valueChanges.subscribe((res)=>{
      // here if my password value is not equals to anything means user enters then add validations for confirmpassword also
      if(res!='') {
        this.userform.controls['confirmPassword'].addValidators([Validators.required])
        this.userform.controls['confirmPassword'].enable();
      }
    })
    

    // StatusChange: whole form status changes example
    this.userform.statusChanges.subscribe((status:any)=>{
      console.log(status, 'form status changed');
      debugger;
    })

    // CombineLatest examples:
    combineLatest([
      this.userform.controls['password'].valueChanges,
      this.userform.controls['confirmPassword'].valueChanges
    ]).subscribe(([pwd,cpwd])=>{
      this.passwordMismatch = pwd && cpwd && pwd !== cpwd;
    })


    // Plain search control
    // this.searchControl.valueChanges.subscribe((searchText:string)=>{
    //   console.log(searchText, 'searchText without reactive form control');
    // })

    // DebounceTime
    this.searchControl.valueChanges.pipe(
      debounceTime(2000)
    ).subscribe((search)=>{
      console.log(search, 'search debounce');
    })
  }



}
