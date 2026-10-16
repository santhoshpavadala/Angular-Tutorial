import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset, setCount } from "./counter-action";

export const initialState = 0;

export const counterReducer = createReducer(
    initialState,

    on(increment, (state)=> state + 1),

    on(decrement, (state)=> state - 1),

    on(reset, ()=>initialState),

    on(setCount, (_state, { count }) => count)
)