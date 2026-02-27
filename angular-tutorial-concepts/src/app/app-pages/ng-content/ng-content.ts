
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ng-content',
  imports: [],
  templateUrl: './ng-content.html',
  styleUrl: './ng-content.scss'
})
export class NgContent {
  @Input() list: any;

  numbers=[1, 2, 3, 4, 5, 6, 7, 8, 9];

  login=false
}
