import { createAction, props } from "@ngrx/store"

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

// If an action needs to carry data, use props():
export const setCount = createAction('[Counter] Set Count', props<{count: number}>());