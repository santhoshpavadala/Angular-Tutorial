import { createReducer, on } from "@ngrx/store";
import { updateEmail, updateMobile, updateName } from "./action";
import { AppState } from "./model";

let initialState:AppState = {
    name: "",
    email: "",
    mobile: "",
    id:0,
    posts:[{id:2, title:"asdf", description: "fgh"}]
}

export const userReducer = createReducer (initialState, 
    on(updateName, (state, data)=>({...state, name: data.name})), //updateName, updateEmail, updateMobile are coming from action.ts
    on(updateEmail, (state, data)=>({...state, email: data.email})),
    on(updateMobile, (state, data)=>({...state,mobile: data.mobile}))
)


// NGRX Effects Example
// let initialState = {
//   users: []
// }

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

// NGRX Effects Example
// export const userReducer = createReducer (initialState,
//   on(updateUsers, (state, {users}) => {
//     return {...state, users}
//   })
// )