import { Component, inject, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud/crud-service';

import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/crud/employee-service';
import { EmpModel } from '../../../models/emp-model';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { GoalModel } from '../../../models/goal-model';
import { Goaltrackerservice } from '../../../services/crud/goaltrackerservice';
import { ConfirmDialog } from '../../../app-shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-crud-operations',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatDialogModule, MatButtonModule],
  templateUrl: './crud-operations.html',
  styleUrls: ['./crud-operations.scss']
})
export class CrudOperations implements OnInit {
  photosService = inject(CrudService);
  photosList: any[] = [];

  employeeData = inject(EmployeeService);
  employeeList: any[]=[];

  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  // Empty Model
  getEmptyPhoto() {
    return {
      albumId: 0,
      id: 0,
      title: '',
      url: '',
      thumbnailUrl: ''
    };
  }

  newPhoto = this.getEmptyPhoto();

  isFormSubmitted: boolean = false;

  ngOnInit() {
    this.getPhotosList();
    this.getEmployeeList();

    this.getGoalList();
  }

  

  // Get Photos
  getPhotosList() {
    this.photosService.getPhoto().subscribe({
      next: (data: any) => {
        this.photosList = Array.isArray(data)
          ? data.slice(0, 10)
          : [];

          // this.photosList = data;
      },
      error: (err) => {
        console.error('Error fetching photos', err);
      }
    });
  }

  // Submit Handler
  onSubmit(form: NgForm) {
    if (this.newPhoto.id === 0) {
      this.onSavePhoto(form);
    } else {
      this.onUpdatePhoto(form);
    }
  }

  // Save
  onSavePhoto(form: NgForm) {
    this.isFormSubmitted = true;
    if(form.valid){
      this.photosService.postPhoto(this.newPhoto).subscribe({
        next: () => {
          this.snackBar.open(
            'batch Created Succesfully',
            'close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          )
          // alert('Photo saved successfully');
          this.getPhotosList();
          this.onReset(form);
          this.isFormSubmitted = false;
        },
        error: (err) => {
          console.error('Error saving photo', err);
        }
      });
    }
  }

  // Update
  onUpdatePhoto(form: NgForm) {
    this.photosService.putPhoto(this.newPhoto.id, this.newPhoto).subscribe({
      next: () => {
        alert('Photo updated successfully');
        this.getPhotosList();
        this.onReset(form);
      },
      error: (err) => {
        console.error('Error updating photo', err);
      }
    });
  }

  // Edit
  onEditPhoto(data: any) {
    this.newPhoto = { ...data }; // Important (no reference mutation)
  }

  // Delete
  onDeletePhoto(id: number) {
    this.photosService.deletePhoto(id).subscribe({
      next: () => {
        alert('Photo deleted successfully');
        this.getPhotosList();
      },
      error: (err) => {
        console.error('Error deleting photo', err);
      }
    });
  }

  // Reset
  onReset(form: NgForm) {
    form.resetForm();
    this.newPhoto = this.getEmptyPhoto();
  }





// ---------------------- Goal Tracker Form -----------------------------
// We need to take an empty object declaration
goalObj: GoalModel = new GoalModel() //for class model
// goalObj: GoalModel = {} as GoalModel // for Interface Model

goalData = inject(Goaltrackerservice);

goalList: any[] = []

// get Method
getGoalList() {
  debugger;
  this.goalData.getGoal().subscribe({
    next:(result:any)=> {
      this.goalList = result;
    },
    error: (err)=>{
      console.log(err);
      const errorMsg = err.message;
      this.snackBar.open(
        errorMsg, "Close",
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      )
    }
  })
}

postGoalList(form: NgForm) {
  this.goalData.postGoal(this.goalObj).subscribe({
    next: (res:any)=>{
      this.snackBar.open(
        "Goal Saved Succesfully","X",
        {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      )
      this.getGoalList();

      // to reset form after save
      form.resetForm();
      this.goalObj = new GoalModel();
    },
    error: (err)=>{
      const errMsg = err.message;
      this.snackBar.open(
        errMsg, "Close",
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      )
    }
  })
}

// here we passes argument as form
resetGoalList(form:NgForm) {
  form.resetForm();
  this.goalObj = new GoalModel();

//   This is the most important line.
// resetForm() does 3 things:
// ✔ Clears input values
// ✔ Removes validation errors
// ✔ Resets touched/dirty states
}

putGoalList(form: NgForm) {
  this.goalData.putGoal(this.goalObj.userId, this.goalObj).subscribe({
    next: (res:any)=>{
      this.snackBar.open(
        "Goal record edited successfully", "Close",
        {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      )

      this.getGoalList();
      form.resetForm();
      this.goalObj=new GoalModel();
    }
  })
}

editGoalList(goal: GoalModel) {
  this.goalObj = {...goal}
}

deleteGoalList(id: number){
  // ---------- Material Dialog confirmation box --------------------------
  const dialogRef = this.dialog.open(ConfirmDialog, {
    width: '400px',
    data: {
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this goal?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }
  });
  dialogRef.afterClosed().subscribe(result=>{
    if(result) {
      this.goalData.deleteGoal(id).subscribe({
      next: (res)=>{
        this.snackBar.open(
          "Goal Deleted Successfully", "Close",
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: "top"
          }
        )
        this.getGoalList(); // refresh table
      },
      error: (err) => {
        this.snackBar.open(
          err.message,
          "Close",
          { 
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: "top"
          }
        );

      }
    })
    }
  })

  // ---------- Noraml confirmation box --------------------------
  // const isDelete = confirm("Are you sure to Delete this Record")
  // if(isDelete) {
  //   this.goalData.deleteGoal(id).subscribe({
  //     next: (res)=>{
  //       this.snackBar.open(
  //         "Goal Deleted Successfully", "Close",
  //         {
  //           duration: 5000,
  //           horizontalPosition: 'right',
  //           verticalPosition: "top"
  //         }
  //       )
  //       this.getGoalList(); // refresh table
  //     },
  //     error: (err) => {
  //       this.snackBar.open(
  //         err.message,
  //         "Close",
  //         { 
  //           duration: 5000,
  //           horizontalPosition: 'center',
  //           verticalPosition: "top"
  //         }
  //       );

  //     }
  //   })
  // }


  // ---------- Default snackbar Dialog confirmation box --------------------------
  // this.goalData.deleteGoal(id).subscribe({
  //     next: (res)=>{
  //       this.snackBar.open(
  //         "Goal Deleted Successfully", "Close",
  //         {
  //           duration: 5000,
  //           horizontalPosition: 'right',
  //           verticalPosition: "top"
  //         }
  //       )
  //       this.getGoalList(); // refresh table
  //     },
  //     error: (err) => {
  //       this.snackBar.open(
  //         err.message,
  //         "Close",
  //         { 
  //           duration: 5000,
  //           horizontalPosition: 'center',
  //           verticalPosition: "top"
  //         }
  //       );

  //     }
  //   })
}






  // ------------------Practice: Employee App---------------------------------------
// Default empty form object setting
// employeeObj = {
//   "employeeId": 0,
//   "fullName": "",
//   "email": "",
//   "phone": "",
//   "gender": "",
//   "dateOfJoining": "",
//   "departmentId": 0,
//   "designationId": 0,
//   "employeeType": "",
//   "salary": 0
// }

// By using model or interface way object declaration
employeeObj: EmpModel = new EmpModel(); // if its class model then use like this
// employeeObj: EmpModel = {} as EmpModel; //if its interface use like this

// getApi Method
  getEmployeeList() {
    debugger
    this.employeeData.getEmployee().subscribe({
      next: (result:any)=>{
        this.employeeList = result;
      }
    })
  }

// Save Method 
  saveEmp() {
    this.employeeData.postEmployee(this.employeeObj).subscribe({
      next: ()=>{
        this.snackBar.open(
          "Employee Details saved successfully", "close",
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )

        // to fetch data with added record
        this.getEmployeeList();
      },
      error: (err:any)=>{
        const errMsg = err.error.message;
        this.snackBar.open(
          // "Error: This api link can't allow to Save", "Close",
          errMsg, "Close",
          {
            duration:5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        )
      }
    })
  }
}
