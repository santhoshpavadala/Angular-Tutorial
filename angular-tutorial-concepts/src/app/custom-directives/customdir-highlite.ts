import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomdirHighlite]',
})
export class CustomdirHighlite {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = "Yellow"
     }

}
