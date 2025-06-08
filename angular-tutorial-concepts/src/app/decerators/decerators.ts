import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-decerators',
  imports: [[CommonModule],],
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
}
