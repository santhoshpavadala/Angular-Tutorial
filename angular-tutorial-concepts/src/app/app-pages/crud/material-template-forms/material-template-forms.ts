import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { EmployeeOnboardModel } from '../../../models/employee-onboard-model';
import { EmployeeOnboardService } from '../../../services/crud/employee-onboard-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../app-shared/confirm-dialog/confirm-dialog';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-material-template-forms',
  imports: [CommonModule, FormsModule, MatInputModule, MatTableModule, MatButtonModule, 
    MatPaginator, MatSort, MatSortHeader],
  templateUrl: './material-template-forms.html',
  styleUrl: './material-template-forms.scss',
})
export class MaterialTemplateForms implements OnInit, AfterViewInit {
  empObj: EmployeeOnboardModel = new EmployeeOnboardModel();

  empServiceData = inject(EmployeeOnboardService);
  snackbar=inject(MatSnackBar)
  dialog=inject(MatDialog)

  companyList: EmployeeOnboardModel[]=[];

  displayedColumns= ['companyName', 'pinCode', 'address', 'phone', 'actions'];
  dataSource = new MatTableDataSource<EmployeeOnboardModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getEmpList()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEmpList() {
    this.empServiceData.getCompany().subscribe({
      next: (res:any)=>{
        // debugger
        // this.companyList = res;

        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  postEmpList(empForm: NgForm) {
    this.empServiceData.postCompany(this.empObj).subscribe({
      next: (res:any)=>{
        this.snackbar.open("Company Added successfully", "X",
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
        this.getEmpList();
        this.onReset(empForm);
        
      }
    })
  }

  onReset(empForm:NgForm) {
    empForm.resetForm();
    this.empObj = new EmployeeOnboardModel();
  }

  onEdit(element: EmployeeOnboardModel) {
    this.empObj = {...element}
  }

  onUpdate(empForm: NgForm) {
    this.empServiceData.putCompany(this.empObj.companyId, this.empObj).subscribe({
      next: (res:any)=>{
        this.snackbar.open(
          "Company Details Updated Successfully", "X",
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
        this.getEmpList();
        this.onReset(empForm);
      }
    })
  }



  onDelete(id:number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '500px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to delete company",
        cancelText: 'Go Back',
        confirmText: 'Delete Now'
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result) {
        this.empServiceData.deleteCompany(id).subscribe({
          next: (res)=>{
            this.snackbar.open("Company Deleted Successfully", "X",
              {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
            )
            this.getEmpList();
          },
          error: (err)=>{
            const errMsg = err.error.msg;
            this.snackbar.open(errMsg, "X",
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
