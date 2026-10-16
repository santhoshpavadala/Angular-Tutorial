import { createAction, props } from "@ngrx/store";
import { Employee } from "./employee-selectors";

// 1. Request to load employees
export const loadEmployees = createAction(
    '[Employees Page] Load Employees'
);

// 2. API request succeeded
export const loadEmployeesSuccess = createAction(
    '[Employees API] Load Employees Success',
     props<{ employees: Employee[] }>()
);

// 3. API request failed
export const loadEmployeesFailure = createAction(
    '[Employees API] Load Employees Failure',
    props<{error: string}>()
)