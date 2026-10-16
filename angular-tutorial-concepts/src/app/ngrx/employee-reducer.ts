import { createReducer, on, State } from "@ngrx/store";
import { EmployeeState } from "./employee-selectors";
import { loadEmployees, loadEmployeesFailure, loadEmployeesSuccess } from "./employee-action";

export const initialEmployeeState: EmployeeState = {
    employees: [],
    loading: false,
    error: null
}

export const employeeReducer = createReducer(
    initialEmployeeState,
    on(loadEmployees, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadEmployeesSuccess, (state, { employees}) => ({
        ...state,
        employees,
        loading: false,
        error: null
    })),

    on(loadEmployeesFailure, (state, { error })=>({
        ...state,
        loading: false,
        error
    }))
)