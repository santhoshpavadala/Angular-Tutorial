import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-decerators',
  imports: [CommonModule, FormsModule],
  templateUrl: './decerators.html',
  styleUrl: './decerators.scss'
})
export class Decerators {
  @Input() parentTitle:string = '';
  @Input() parentNumber:number[] = [];

  @Output() childData = new EventEmitter<string>();
  message:string ="Child Data Message Pass to Parent";

  onClick () {
    console.log('onclick');
    this.childData.emit(this.message);
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
