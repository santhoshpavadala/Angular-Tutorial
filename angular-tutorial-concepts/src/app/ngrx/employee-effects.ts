import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from '../services/jsonplaceholder/user-service';
import { loadEmployees, loadEmployeesFailure, loadEmployeesSuccess } from './employee-action';

export const loadEmployeesEffect = createEffect(
  (
    actions$ = inject(Actions),
    employeeService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(loadEmployees),

      switchMap(() =>
        employeeService.getEmployees().pipe(
          map(employees =>
            loadEmployeesSuccess({ employees })
          ),

          catchError(() =>
            of(
              loadEmployeesFailure({
                error: 'Unable to load employees'
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);