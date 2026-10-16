import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

//4. One employee
export interface Employee {
  id: number;
  name: string;
  email: string;
  // department: string;
}

//5. Complete employee feature state
export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

//6. Select the entire employees state
export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employees');

//7. Select only the employee array
export const selectAllEmployees = createSelector(
  selectEmployeeState,
  state => state.employees
);

//8. Select only the loading flag
export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  state => state.loading
);

//9. Select only the error
export const selectEmployeeError = createSelector(
  selectEmployeeState,
  state => state.error
);

// export const selectITEmployees = createSelector(
//   selectAllEmployees,
//   employees => employees.filter(
//     employee => employee.department === 'IT'
//   )
// );