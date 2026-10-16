import { Component, inject } from '@angular/core';
import { MyButton } from '../../app-shared/my-button/my-button';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { decrement, increment, reset, setCount } from '../../ngrx/counter-action';
import { selectAllEmployees, selectEmployeeError, selectEmployeesLoading } from '../../ngrx/employee-selectors';
import { loadEmployees } from '../../ngrx/employee-action';

@Component({
  selector: 'app-counter',
  imports: [ AsyncPipe],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  store = inject(Store<{counter: number}>);
  count$ = this.store.select('counter');

  // Expose actions to the template
  increment = increment;
  decrement = decrement;
  reset = reset;
  setCount = setCount;

  //  onIncrement() {
  //   this.store.dispatch(increment());
  // }

  // onDecrement() {
  //   this.store.dispatch(decrement());
  // }

  // onReset() {
  //   this.store.dispatch(reset());
  // }
}
