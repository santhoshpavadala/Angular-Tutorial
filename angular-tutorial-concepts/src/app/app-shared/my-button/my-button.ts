import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  imports: [CommonModule],
  templateUrl: './my-button.html',
  styleUrl: './my-button.scss',
})
export class MyButton {
  @Input() btnText:string = ''
  @Input() btnClass:string = ''

  @Output() onBtnClick = new EventEmitter<string>();

  onClick() {
    this.onBtnClick.emit('This is from child');
  }
}
