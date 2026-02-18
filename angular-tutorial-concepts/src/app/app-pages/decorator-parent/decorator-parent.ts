import { Component, ViewChild } from '@angular/core';
import { Decerators } from './decerators/decerators';

@Component({
  selector: 'app-decorator-parent',
  imports: [Decerators],
  templateUrl: './decorator-parent.html',
  styleUrl: './decorator-parent.scss'
})
export class DecoratorParent {
  // Input Decerators
  title = 'Angular Input Decerator Title';
  pnumber = [10, 30, 50, 70, 90];
  userData = { name: 'Alice', age: 30 };
  data  = "Send parent to child"
  name: string = "Santhosh"
  
// Output Decerators
  childData:string='';
  message = '';
  receiveMessage(msg: string) {
    this.message = msg;
  }

  @ViewChild(Decerators) parentDecerator!: Decerators;
  cdata='';
  getChildData() {
    this.cdata=this.parentDecerator.passChildToParentData;
  }
}
