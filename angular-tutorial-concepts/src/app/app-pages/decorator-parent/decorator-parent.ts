import { Component, ViewChild } from '@angular/core';
import { Decerators } from './decerators/decerators';
import { Alert } from "../../app-shared/alert/alert";
import { MyButton } from "../../app-shared/my-button/my-button";

@Component({
  selector: 'app-decorator-parent',
  imports: [Decerators, Alert, MyButton],
  templateUrl: './decorator-parent.html',
  styleUrl: './decorator-parent.scss'
})
export class DecoratorParent {
  // Input Decerators Variables
  title = 'Angular Input Decerator Title';
  pnumber = [10, 30, 50, 70, 90];
  userData = { name: 'Alice', age: 30 };
  data  = "Send parent to child"
  name: string = "Santhosh"
  
// Output Decerators Variables
  childData:string='';
  message = '';
  receiveMessage(msg: string) {
    this.message = msg;
  }

  // Viewchild decerator:Example of GETING FROM CHILD DATA
  @ViewChild(Decerators) parentDecerator!: Decerators;
  cdata='';
  getChildData() {
    this.cdata=this.parentDecerator.passChildToParentData;
  }


  // Reusable Componets with Input and Output decerators
  alrtType:string = "Warning";
  alertMsg = "This is Warning Alert Message;"
  classBtn = "btn btn-success"
  textBtn = "Success Button"
  onSave(data:any) {
    debugger
    console.log(data);
    alert("Success Button: This is Reusable Btn output decerator click")
  }
}
