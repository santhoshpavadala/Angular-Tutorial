import { Component, Input } from '@angular/core';
import { LifecycleHooks } from './lifecycle-hooks/lifecycle-hooks';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { LifecyclePractices } from './lifecycle-practices/lifecycle-practices';
import { LifecycleExamples } from './lifecycle-examples/lifecycle-examples';

@Component({
  selector: 'app-lifecycle-parent',
  standalone: true,
  imports: [LifecycleHooks, LifecyclePractices, LifecycleExamples, FormsModule],
  templateUrl: './lifecycle-parent.html',
  styleUrl: './lifecycle-parent.scss'
})
export class LifecycleParent {
  maintitle:string = "LIFE CYCLE HOOK TITLE";
  mobilelist:any[]=[
    "Apple",
    "Samsung",
    "Oppo",
    "Motorola",
    "Vivo"
  ];
  mobiles=''

  lp="This is Lifecycle parent paragraph.";

  activeTab: string = 'examples';

  addMobile() {
    // this.mobilelist.push(this.mobiles);

    this.mobilelist = [...this.mobilelist, this.mobiles]
    this.mobiles="";
  }
}
