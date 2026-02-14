import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle-examples',
  imports: [],
  templateUrl: './lifecycle-examples.html',
  styleUrl: './lifecycle-examples.scss'
})
export class LifecycleExamples implements OnDestroy{
  saved=false;
  ngOnDestroy(): void {
    console.log("example component destoyed");
    if(!this.saved) {
      alert("Saved Changes")
    }
  }
}
