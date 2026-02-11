import { Component, Input } from '@angular/core';
import { LifecycleHooks } from './lifecycle-hooks/lifecycle-hooks';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lifecycle-parent',
  standalone: true,
  imports: [LifecycleHooks],
  templateUrl: './lifecycle-parent.html',
  styleUrl: './lifecycle-parent.scss'
})
export class LifecycleParent {
  maintitle:string = "This is main Lifecycle title";
}
