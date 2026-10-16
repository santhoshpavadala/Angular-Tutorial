import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllEmployees, selectEmployeeError, selectEmployeesLoading } from '../../ngrx/employee-selectors';
import { loadEmployees } from '../../ngrx/employee-action';

@Component({
  selector: 'app-employees',
  imports: [AsyncPipe],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees {
  private store = inject(Store);

  employees$ = this.store.select(selectAllEmployees);
  loading$ = this.store.select(selectEmployeesLoading);
  error$ = this.store.select(selectEmployeeError);

  loadData(): void {
    this.store.dispatch(loadEmployees());
  }

}
