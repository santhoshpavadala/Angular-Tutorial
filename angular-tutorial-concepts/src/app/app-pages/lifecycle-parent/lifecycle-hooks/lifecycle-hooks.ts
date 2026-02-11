import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-hooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-hooks.html',
  styleUrl: './lifecycle-hooks.scss'
})
export class LifecycleHooks implements OnChanges {
  @Input() title:string="";
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

}
