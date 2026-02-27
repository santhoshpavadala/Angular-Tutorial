import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CrudService } from '../../../services/crud/crud-service';
import { CrudReactiveService } from '../../../services/crud/crud-reactive-service';

@Component({
  selector: 'app-crud-operations-reactive',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crud-operations-reactive.html',
  styleUrl: './crud-operations-reactive.scss'
})
export class CrudOperationsReactive implements OnInit {
//   {
//   "userId": 0,
//   "emailId": "string",
//   "password": "string",
//   "fullName": "string",
//   "mobileNo": "string"
// }

// Initilize formgroups and form controls
  userForm:FormGroup = new FormGroup({
      userId: new FormControl(0),
      fullName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
  }); 

  isFormSubmitted: boolean = false;


  http=inject(HttpClient) // dependency inj constructor

  userList$: Observable<any[]>;
  constructor(private addnum: CrudReactiveService) {
    this.userList$ = this.http.get<any[]>('https://api.freeprojectapi.com/api/GoalTracker/getAllUsers');

    // API INTEGRATION EXAMPLES
    const sum = this.addnum.getAdditionOfTwoNo(44, 55);
    debugger
  }
  ngOnInit(): void {
  }

  onSave() {
    debugger;
    this.isFormSubmitted = true;
    if(this.userForm.valid) {
      const formValue = this.userForm.value;
      // Form post method we have to use url and form object;
      this.http.post("https://api.freeprojectapi.com/api/GoalTracker/register", formValue).subscribe({
        next: (response)=>{
          alert("User Craeted with Post method")
          this.isFormSubmitted = false;
        },
        error: (error)=>{
          alert("Something went wrong")
        }
      })
    }
  }

  onEdit(data:any) {
    this.userForm = new FormGroup({
      userId: new FormControl(data.userId),
      emailId: new FormControl(data.emailId),
      password: new FormControl(data.password),
      fullName: new FormControl(data.fullName),
      mobileNo: new FormControl(data.mobileNo)
  }); 
  }

  onReset() {
    this.userForm.reset();
  }

}
