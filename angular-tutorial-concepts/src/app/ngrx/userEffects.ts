
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { NgrxUsers } from '../services/ngrx-users';
import { getUsers, updateUsers } from './action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: NgrxUsers
  ) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() =>
        this.userService.getData().pipe(
          map(users => updateUsers({ users }))
        )
      )
    )
  );
}
