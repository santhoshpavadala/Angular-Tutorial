
import { Component, ElementRef, EventEmitter, input, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../../app-shared/alert/alert';
import { MyButton } from "../../../app-shared/my-button/my-button";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MyCard } from '../../../app-shared/my-card/my-card';

@Component({
  selector: 'app-decerators',
  imports: [FormsModule, Alert, MyButton, CommonModule, MyCard],
  templateUrl: './decerators.html',
  styleUrl: './decerators.scss'
})
export class Decerators {
  @Input() parentTitle:string = '';
  @Input() parentTitle2: string = ''
  @Input() pdata:string = '';
  @Input() pname: string = '';
  @Input() parentNumber:number[] = [];
  @Input() puser: { name: string; age: number } | null = null;
  @Input('parentMsg') almessage: string='';

  @Output() childData = new EventEmitter<string>();
  message:string ="Child Data Message Pass to Parent";
  @Output() messageEvent = new EventEmitter<string>();
  message2:string="This is Child data to parent on click button"
  userList$ = Observable<any[]>;
  onClick () {
    console.log('onclick');
    this.childData.emit(this.message);
  }
  sendMsg() {
    this.messageEvent.emit('Hello Iam from child')
  }
  
@Output() msgToParent = new EventEmitter<string>();
chMsg = "Hello im from child data"
sendData() {
  this.msgToParent.emit(this.chMsg);
}





    // Reusable Componets with Input and Output decerators
  msg: string= "This is Succes Alert Message;"
  alrtType: string = "Success"
  classBtn: string = "btn btn-warning"
  textBtn: string = "Warning Button"
  onUpdate(event:any) {
    debugger
    console.log(event);
    alert("Warning Button: This is Reusable Btn output decerator click")
  }


// Template Reference
  templateData:string="This is Template Reference Data: passing data from child to parent using View child";
  templateFunction() {
    return "This is Template Reference Data: This child Function has the child data showining in parent"
  }
  ngModelData:string="This is Template Reference Data: This is ngModel Data with input changing with app data";


  // View Child Decerator
   @ViewChild('inputRef') inputDom!: ElementRef;
  //  if you want to implemnt componet viewchild method should use in ngAfterviewinit only
  @ViewChild(Alert) alertComp!: Alert;
  childCompData:string = ''

  childTitle!:string;

  


   ngAfterViewInit() {
    console.log(this.inputDom);
    this.inputDom.nativeElement.onkeyup = ()=> {
      console.log(this.inputDom.nativeElement.value);
    }
    this.childCompData = this.alertComp.viewChildData;
    this.childTitle = this.alertPop.title
   }

   @ViewChild('inputValue') inputValue!: ElementRef;
   inpValue:string ='';
   readInput() {
    this.inpValue = this.inputValue.nativeElement.value
   }

   @ViewChild('inputFocus') ipFocus!: ElementRef;
   focusInput() {
    this.ipFocus.nativeElement.focus();
   }

   @ViewChild(Alert) alertPop!: Alert;

   callChild() {
    this.alertPop.showAlert();
   }

   


   








   @ViewChild ('inputFocusChange') inputFocus!:ElementRef;
   focusChange() {
    this.inputFocus.nativeElement.focus();
   }
   @ViewChild ('getIpValue') getIpValue!:ElementRef;
   inputData: string = ''
   getInputValue() {
    this.inputData = this.getIpValue.nativeElement.value;
   }


   













   

  @ViewChild('domView') domData!: ElementRef;
  domChange() {
    console.log('Initial Value:', this.domData.nativeElement);
    this.domData.nativeElement.style.background="red";
    this.domData.nativeElement.innerText="Hello, this is inner text changed,styles changed ";
  }

  // Passing data from child to parent also we can use 
  passChildToParentData:string='Passing Child Data to Parent with View Child Decerator'
  passChildToParent() {
    return this.passChildToParentData;
  }

  
  

  // Differences between view child and view children
  @ViewChild('paraViewchild') paraData1!:ElementRef;
  @ViewChildren('paraViewchildren') paraData2!:QueryList<ElementRef>;
  @ViewChildren('searchBox') searchBoxes!: QueryList<ElementRef>;

  paraTest() {
    console.log('view child', this.paraData1);
    console.log('view child', this.paraData1.nativeElement.innerText);
    console.log('view children', this.paraData2);

    for(let ele of this.paraData2.toArray()) {
      console.log('view children', ele.nativeElement.innerText);
    }

    
  }

  focusAllInput() {
    this.searchBoxes.forEach(
      input=>{
        input.nativeElement.focus();
      }
    )
  }


  


}
