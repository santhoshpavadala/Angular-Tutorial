import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-card',
  imports: [],
  templateUrl: './my-card.html',
  styleUrl: './my-card.scss',
})
export class MyCard {
  @Input() cardTitle: string = "";
  @Input() cardData:any = "";

}
