import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgrxChild } from './ngrx-child/ngrx-child';
import { MyCard } from '../../app-shared/my-card/my-card';

@Component({
  selector: 'app-ngrx',
  imports: [NgrxChild, MyCard],
  templateUrl: './ngrx.html',
  styleUrl: './ngrx.scss'
})
export class Ngrx {
  usersData: any;

  constructor(private storeData: Store<any>) {
    storeData.select('user').subscribe( //to call only user data
      (data)=>{
        this.usersData=data;
        console.log(this.usersData);
        
      }
    )

    // storeData.subscribe( // to call entire data reducer
    //   (data)=>{
    //     this.usersData=data;
    //     console.log(this.usersData);
    //   }
    // )
  }

  ngrxEntity = `
import { createEntityAdapter } from '@ngrx/entity';
import { Employee } from './employee.selectors';

export const employeeAdapter =
  createEntityAdapter<Employee>();

export const initialState =
  employeeAdapter.getInitialState({
    loading: false,
    error: null as string | null
  });
`

selectorNgrx = `
export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

You can define selectors using createFeatureSelector() and createSelector().

File: employee.selectors.ts
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export interface Employee {
  id: number;
  name: string;
  department: string;
}

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  state => state.employees
);

export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  state => state.loading
);

export const selectEmployeeError = createSelector(
  selectEmployeeState,
  state => state.error
);

export const selectITEmployees = createSelector(
  selectAllEmployees,
  employees => employees.filter(
    employee => employee.department === 'IT'
  )
);
`

defer = `
<h2>Dashboard</h2>

@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <div class="chart-placeholder">
    Chart will appear here.
  </div>
} @loading (after 200ms; minimum 500ms) {
  <p>Loading chart...</p>
} @error {
  <p>Unable to load the chart.</p>
}

Important triggers
Trigger	        Meaning
on viewport	    The placeholder enters the viewport
on interaction	The user interacts with the placeholder
on idle	        The browser reaches an idle period
on timer(2s)	  The specified time elapses
when condition	A condition becomes true
`

track = `
@for (employee of employees; track employee.id) {
  <div class="employee-row">
    {{ employee.name }}
  </div>
} @empty {
  <p>No employees found.</p>
}
`

virtualScroll = `
<cdk-virtual-scroll-viewport
  itemSize="48"
  class="viewport">

  <div *cdkVirtualFor="let employee of employees">
    {{ employee.name }}
  </div>

</cdk-virtual-scroll-viewport>

.viewport {
  height: 400px;
}
`
debounce = `
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query =>
    this.employeeService.search(query ?? '')
  )
);
`

memoryLeak = `
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: \`<p>Employee screen</p>\`
})
export class EmployeeComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.employeeService.getUpdates()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(update => {
        console.log(update);
      });
  }

  constructor(private employeeService: EmployeeService) {}
}
`

}
