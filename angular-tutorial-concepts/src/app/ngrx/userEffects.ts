import { Injectable } from "@angular/core";
import { NgrxUsers } from "../services/ngrx-users";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getUsers, updateUsers } from "./action";
import { map, mergeMap } from "rxjs/operators"; 

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: NgrxUsers) {}

    // fetchUsers$=createEffect(()=>
    //     this.actions$.pipe(
    //         ofType(getUsers),
    //         mergeMap(()=>
    //         this.userService.getData().pipe(
    //             map((users)=> updateUsers({ users }))
    //         )
    //         )
    //     )
    // )
}