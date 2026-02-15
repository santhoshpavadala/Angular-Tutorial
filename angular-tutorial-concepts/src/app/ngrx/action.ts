import { createAction, props } from "@ngrx/store";

// Need to import createAction method in Ngrx.
// Need to import props from ngrx

/*
  createAction() → creates an action function.
  props<>() → defines the payload structure.
  This gives strong typing.
*/

/*
  updateName is NOT the action itself.
  It is a FUNCTION that returns an action object.

  When we call:
  updateName({ name: 'Santhosh' })

  It returns:
  {
    type: 'name-edit',
    name: 'Santhosh'
  }
*/

export const updateName = createAction('name-edit', props<{name:string}>()); //syntax, it return a function updateName. createAction and props are the inbulit inputs
export const updateEmail = createAction('email-edit', props<{email:string}>());
export const updateMobile = createAction('mobile-edit', props<{mobile:string}>());



// Create Action example:
// export function  updateName(name){
//     return {
//         type: "name-edit",
//         payload: name
//     }
// }

// export function  updateEmail(name){
//     return {
//         type: "email-edit",
//         payload: name
//     }
// }

// export function  updateMoile(name){
//     return {
//         type: "mobile-edit",
//         payload: name
//     }
// }