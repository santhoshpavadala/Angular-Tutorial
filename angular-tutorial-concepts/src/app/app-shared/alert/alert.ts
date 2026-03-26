import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {

  @Input() alertType: string = '';
  @Input() alertMessage: string = '';

  // This var is used to viewchild example to get child data to parent
  viewChildData = "This is View child data using component method"

}
