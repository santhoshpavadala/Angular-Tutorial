import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateEmail, updateMobile, updateName } from '../../../ngrx/action';

@Component({
  selector: 'app-ngrx-child',
  imports: [],
  templateUrl: './ngrx-child.html',
  styleUrl: './ngrx-child.scss'
})
export class NgrxChild {

  constructor(private childStore: Store) {}

  // updateName(input:any) {
  //   this.childStore.dispatch({type: "name-edit", payload:input.value})
  //   input.value=""
  // }
  editName(input:any) {
    console.log(updateName({name: input.value}), 'updateName Value');
    
    this.childStore.dispatch(updateName({name: input.value}))
    input.value=""
  }
  editEmail(input:any) {
    this.childStore.dispatch(updateEmail({email:input.value}))
    input.value=""
  }
  editMobile(input:any) {
    this.childStore.dispatch(updateMobile({mobile: input.value}))
    input.value=""
  }
}
