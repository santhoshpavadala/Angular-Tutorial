import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, input, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-decerators',
  imports: [CommonModule, FormsModule],
  templateUrl: './decerators.html',
  styleUrl: './decerators.scss'
})
export class Decerators {
  @Input() parentTitle:string = '';
  @Input() pdata:string = '';
  @Input() pname: string = '';
  @Input() parentNumber:number[] = [];
  @Input() puser: { name: string; age: number } | null = null;
  @Input('parentMsg') almessage: string='';

  @Output() childData = new EventEmitter<string>();
  message:string ="Child Data Message Pass to Parent";

  @Output() messageEvent = new EventEmitter<string>();

  onClick () {
    console.log('onclick');
    this.childData.emit(this.message);
  }

  sendMsg() {
    this.messageEvent.emit('Hello Iam from child')

  }

// Template Reference
  templateData:string="This is Template Data";
  templateFunction() {
    return "This child Function has the child data showining in parent"
  }
  ngModelData:string="This is ngModel Data with input changing with app data";


  // View Child Decerator
  passChildToParentData:string='Passing Child Data to Parent with View Child Decerator'
  passChildToParent() {
    return this.passChildToParentData
  }

  // DOM View Child Reference
   @ViewChild('domView') domData!: ElementRef;

   @ViewChild('inputRef') inputDom!: ElementRef;

   ngAfterViewInit() {
    console.log(this.inputDom);
    this.inputDom.nativeElement.onkeyup = ()=> {
      console.log(this.inputDom.nativeElement.value);
    }
   }

  domChange() {
    console.log('Initial Value:', this.domData.nativeElement);
    this.domData.nativeElement.style.background="red";
    this.domData.nativeElement.innerText="Hello";
  }

  // Differences between view child and view children
  @ViewChild('paraViewchild') paraData1!:ElementRef;
  @ViewChildren('paraViewchildren') paraData2!:QueryList<ElementRef>;

  paraTest() {
    console.log('view child', this.paraData1);
    console.log('view child', this.paraData1.nativeElement.innerText);

    console.log('view children', this.paraData2);

    for(let ele of this.paraData2.toArray()) {
      console.log('view children', ele.nativeElement.innerText);
    }

    
  }
  


}
