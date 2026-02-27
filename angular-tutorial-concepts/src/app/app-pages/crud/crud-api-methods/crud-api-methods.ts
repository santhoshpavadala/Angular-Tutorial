import { Component, inject, OnInit, signal } from '@angular/core';
import { Batch } from '../../../models/batch';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crud-api-methods',
  imports: [FormsModule, MatSnackBarModule, MatDialogModule, MatButtonModule],
  templateUrl: './crud-api-methods.html',
  styleUrl: './crud-api-methods.scss'
})
export class CrudApiMethods implements OnInit {
  newBatchObject: Batch = new Batch();
  http=inject(HttpClient);
  snackbar=inject(MatSnackBar);

  // batchList:Batch[]=[] // instead we can use signal aslo in below
  batchList = signal<Batch[]>([]);

  ngOnInit(): void {
    this.getAllBatches(); // should call in oninit or constructor to get api data
  }

  // Post method
  onSaveBatch(form: NgForm){
    debugger
    this.http.post('https://api.freeprojectapi.com/api/FeesTracking/batches/', this.newBatchObject).subscribe(
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
    this.http.get('https://api.freeprojectapi.com/api/FeesTracking/batches').subscribe({
      next: (result: any)=>{
        // this.batchList = result;
        this.batchList.set(result);
      },
      error: (error: any)=>{
        alert('Error Occurred')
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
  onDeleteBatch(id:any) {
    // To add conform box
    const isConform = confirm('Are you sure wan to Delete');
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
  }

  onResetBatch(form: NgForm) {
    form.resetForm();
    this.newBatchObject = new Batch();
  }


}
