import { AfterContentInit, Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-my-card',
  imports: [],
  templateUrl: './my-card.html',
  styleUrl: './my-card.scss',
})
export class MyCard implements AfterContentInit {
  @Input() cardTitle: string = "";
  @Input() cardData:any = "";

  @ContentChild('title') title!: ElementRef;

  ngAfterContentInit(): void {
    console.log(this.title.nativeElement.textContent);
    
    
  }

}
