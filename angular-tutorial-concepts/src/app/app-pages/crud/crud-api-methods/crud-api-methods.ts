import { Component, inject, OnInit, signal } from '@angular/core';
import { Batch } from '../../../models/batch';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialog } from '../../../app-shared/confirm-dialog/confirm-dialog';

import { Competition } from '../../../models/competition';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { BatchesService } from '../../../services/crud/batches-service';

@Component({
  selector: 'app-crud-api-methods',
  imports: [FormsModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule, MatButtonModule],
  templateUrl: './crud-api-methods.html',
  styleUrl: './crud-api-methods.scss'
})
export class CrudApiMethods implements OnInit {
  newBatchObject: Batch = new Batch();

  http=inject(HttpClient);
  snackbar=inject(MatSnackBar);
  dialog = inject(MatDialog);

  batchData=inject(BatchesService);

  // batchList:Batch[]=[] // instead we can use signal aslo in below
  batchList = signal<Batch[]>([]);

  ngOnInit(): void {
    this.getAllBatches(); // should call in oninit or constructor to get api data
    this.getAllCompetitions();
  }

  // Post method
  onSaveBatch(form: NgForm){
    this.batchData.saveBatch(this.newBatchObject).subscribe(
      {
        next: (res: any)=> {
          this.snackbar.open(
            'Batch Created Successfully',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          )
          // alert('Batch Created Successfully;')
          this.getAllBatches();// to call this to get reload the data and updates
          form.resetForm();
          this.newBatchObject = new Batch();
      },
      error: (err:any)=>{
        // alert(err.error.message);
        const message = err?.error?.message || 'Something went wrong!';
        this.snackbar.open(
        message,
        'Close',
        { 
          // duration: 10000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
         }
      );
      }
      },
    )
  }
  // Get method
  getAllBatches() {
    this.batchData.getBatches().subscribe({
      next: (result: any)=>{
        this.batchList.set(result);
      },
      error: (error: any)=>{
        const message = error.error.message;
        alert(message);
      }
    })
  }

  onEditBatch(data:any) {
    const stringData=JSON.stringify(data);
    const strObj = JSON.parse(stringData);
    this.newBatchObject = strObj;
  }

  // Put or Update method
  onUpdateBatch(){
    this.http.put('https://api.freeprojectapi.com/api/FeesTracking/batches/'+this.newBatchObject.batchId, this.newBatchObject).subscribe(
      {
        next: (res: any)=> {
          this.snackbar.open(
            'Batch Updated Successfully',
            'X',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          )
          this.getAllBatches();// to call this to get reload the data and updates
      },
      error: (err:any)=>{
        debugger;
        alert(err.error.message);
      }
      },
    )
  }

  // Delete Method
  onDeleteBatch(id:number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {
        message: 'Are you sure you want to delete this batch?'
      }
    });
    dialogRef.afterClosed().subscribe(isConform => {
    if(isConform == true) {
      this.http.delete('https://api.freeprojectapi.com/api/FeesTracking/batches/'+ id).subscribe ({
      next: (res) => {
        alert('Batch Deleted Successfully');
          this.getAllBatches();// to call this to get reload the data and updates
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
    }
  })
  }

  onResetBatch(form: NgForm) {
    form.resetForm();
    this.newBatchObject = new Batch();
  }





  // Reactive Forms Code strats from here;
  competitionForm: FormGroup = new FormGroup({
    competitionId: new FormControl(0, Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    status: new FormControl()
  })

  competitionList = signal<Competition[]>([])

  // GET Method
  getAllCompetitions() {
    this.http.get('https://api.freeprojectapi.com/api/ProjectCompetition/GetAllCompetition').subscribe({
      next: (res:any)=>{
        this.competitionList.set(res);
      },
      error: (err)=>{
      }
    })
  }

  // Post Method
  saveCompetition() {
    // In Reactive form we need to send the formvalue as parameter to the post method
    const formValue = this.competitionForm.value;
    this.http.post('https://api.freeprojectapi.com/api/ProjectCompetition/competition', formValue).subscribe({
      next:(res:any)=>{
        this.snackbar.open('Competition Saved Successfully', 'X',{
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.getAllCompetitions();
      },
      error:(err:any)=>{
        const message = err.error.message;
        this.snackbar.open(
          message,
          'X', 
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snack']
          
        })
      }
    })
  }

  onEditComp(item:Competition) {
    this.competitionForm = new FormGroup({
      competitionId: new FormControl(item.competitionId),
      title: new FormControl(item.title),
      description: new FormControl(item.description),
      startDate: new FormControl(item.startDate),
      endDate: new FormControl(item.endDate),
      status: new FormControl(item.status)
    })
  }


  // PUT Method
  updateCompetition() {
    // In Reactive form we need to send the formvalue as parameter to the post method
    const formValue = this.competitionForm.value;
    this.http.put('https://api.freeprojectapi.com/api/ProjectCompetition/competition/update/'+ formValue.competitionId, formValue).subscribe({
      next:(res:any)=>{
        this.snackbar.open('Competition Updated Successfully', 'X',{
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.getAllCompetitions();
      },
      error:(err:any)=>{
        const message = err.error.message;
        this.snackbar.open(
          message,
          'X', 
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snack']
        })
      }
    })
  }

  deleteCompetition(id: number) {
    // In Reactive form we need to send the formvalue as parameter to the post method
    const formValue = this.competitionForm.value;
    this.http.delete('https://api.freeprojectapi.com/api/ProjectCompetition/competition/update/'+ id).subscribe({
      next:(res:any)=>{
        this.snackbar.open('Competition Deleted Successfully', 'X',{
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.getAllCompetitions();
      },
      error:(err:any)=>{
        const message = err.error.message;
        this.snackbar.open(
          message,
          'X', 
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snack']
        })
      }
    })
  }
}
