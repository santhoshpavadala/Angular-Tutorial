import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCutomdirIf]'
})
export class CutomdirIf {

  constructor(
    //------------- custom structural ngif example----------------------
    private html: TemplateRef<any>, // view data 
    private container: ViewContainerRef // parent template
  ) { }

  @Input() set appCustomdir(showIfRef:boolean) { //showIfRef is the argument is comes from component 
    if(showIfRef) {
      this.container.createEmbeddedView(this.html)
    }
  }


}
