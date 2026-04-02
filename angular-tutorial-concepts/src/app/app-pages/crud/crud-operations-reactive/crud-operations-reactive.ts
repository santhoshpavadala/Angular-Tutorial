import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LeavetrackService } from '../../../services/crud/leavetrack-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../app-shared/confirm-dialog/confirm-dialog';
import { Title } from '@angular/platform-browser';

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
  constructor() {
    this.userList$ = this.http.get<any[]>('https://api.freeprojectapi.com/api/GoalTracker/getAllUsers');
  }
  ngOnInit(): void {
    this.getLeaves();
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





  // leaveForm: FormGroup = new FormGroup({
  //   empId: new FormControl(0),
  //   empName: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   deptName: new FormControl('', Validators.required),
  //   designation: new FormControl('', Validators.required),
  //   createdDate: new FormControl(new Date().toISOString().split('T')[0], Validators.required), // ✅
  //   userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   password: new FormControl('123'), // optional default
  //   sickLeaveBalance: new FormControl(0), // ✅ number
  //   paidLeaveBalance: new FormControl(0), // ✅ number
  //   role: new FormControl('Employee', Validators.required) // ✅
  // })

  leavesList: any[] = [];
  getLeavesServiceData = inject(LeavetrackService)
  snackbar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  fb=inject(FormBuilder);


  leaveForm = this.fb.group({
    empId: [0],
    empName: ['', [Validators.required, Validators.minLength(5)]],
    contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    deptName: ['', Validators.required],
    designation: ['', Validators.required],
    createdDate: [new Date().toISOString().split('T')[0], Validators.required], // ✅
    userName: ['', [Validators.required, Validators.minLength(5)]],
    password: ['123'], // optional default
    sickLeaveBalance: [0], // ✅ number
    paidLeaveBalance: [0], // ✅ number
    role: ['Employee', Validators.required] // ✅
  })


  // get Method
  getLeaves() {
    this.getLeavesServiceData.getLeaves().subscribe({
      next: (res:any)=>{
        this.leavesList = res;
      },
      error: (err:any)=>{
        const errMsg = err.error;
        this.snackbar.open(
          errMsg, "X",
          {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          }
        )
      }
    })
  }

  // post method
  saveLeave() {
    const formSaveValue = this.leaveForm.value;
    this.getLeavesServiceData.postLeaves(formSaveValue).subscribe({
      next: (res:any)=>{
        this.snackbar.open(
          "Leave created succesfully", "X",
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
        this.getLeaves();
        this.resetLeave();
      }
    })
  }

  // On Action edit mode
  editLeave(objData:any) {
    // patchValue() is used because:
    // It updates only required fields
    // No need to pass all fields
    this.leaveForm.patchValue({
      empId: objData.empId,
      empName: objData.empName,
      contactNo: objData.contactNo,
      email: objData.email,
      deptName: objData.deptName,
      designation: objData.designation,
      userName: objData.userName,
      // optional fields
      sickLeaveBalance: objData.sickLeaveBalance || 0,
      paidLeaveBalance: objData.paidLeaveBalance || 0,
      role: objData.role || 'Employee',
      createdDate: objData.createdDate
    })
  }

  // put/update method
  updateLeave() {
    debugger
    const formValue = this.leaveForm.value as any;
    this.getLeavesServiceData.updateLeaves(formValue.empId, formValue).subscribe({
      next: (res:any) => {
        this.snackbar.open(
          "Form Updated Successfully","X",
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
        this.getLeaves();
        this.resetLeave();
      },
      error: (err) => {

      }
    })
  }

  resetLeave() {
    this.leaveForm.reset(
      {
        empId: 0,
        empName: '',
        contactNo: '',
        email: '',
        deptName: '',
        designation: '',
        createdDate: new Date().toISOString().split('T')[0],
        userName: '',
        password: '123',
        sickLeaveBalance: 0,
        paidLeaveBalance: 0,
        role: 'Employee'
      }
    );
  }

  deleteLeave(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to Delete ?',
        confirmText: 'Delete',
        cancelText: 'Cancel Back'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getLeavesServiceData.deleteLeaves(id).subscribe({
        next: (res:any)=>{
          this.snackbar.open(
            "Leaves deleted successfully", "X",
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          )
          this.getLeaves();
        },
        error: (err:any)=>{
          const errMsg = err.message;
          this.snackbar.open(
            errMsg, "X",
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            }
          )
        }
      })
      }
    })
  }
}
