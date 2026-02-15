import { Action, createReducer, on } from "@ngrx/store";
import { updateEmail, updateMobile, updateName } from "./action";
import { AppState } from "./model";




/*
  initialState → default state of this feature.
  Store will use this when app loads first time.
*/
let initialState:AppState = {
    name: "",
    email: "",
    mobile: "",
    id:0,
    posts:[{id:2, title:"asdf", description: "fgh"}]
}

// // dispatch({type: 'name-edit', payload: "san"})
// export function userReducer (state=initialState,action: Action) {
//     switch(action.type) {
//         case 'name-edit' :
//         return {...state, name:(action as any).payload}
//         case 'email-edit' : 
//         return {...state, email:(action as any).payload}
//         case 'mobile-edit' : 
//         return {...state, mobile:(action as any).payload};
//         default: 
//         return state
//     }
// }




/*
  createReducer()

  1️⃣ First parameter → initialState
  2️⃣ Then multiple on() functions
*/

export const userReducer = createReducer (initialState, 
    on(updateName, (state, data)=>({...state, name: data.name})),
    on(updateEmail, (state, data)=>({...state, email: data.email})),
    on(updateMobile, (state, data)=>({...state,mobile: data.mobile}))
)

/*
    on(actionName, callback)

    When updateName action is dispatched,
    this function runs.

    state → current state
    data → action payload
  */

    
/*
  IMPORTANT:
  Reducer NEVER modifies state directly.
  It always returns a NEW object (immutable pattern).
*/