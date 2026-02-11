import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomdir]'
})
export class Customdir {

  constructor(private el: ElementRef,
    
  ) { 
    // Custom Directives - (attribute)
    console.log(el, 'element ref');
    el.nativeElement.style.border="2px solid red"
  }

  
}
