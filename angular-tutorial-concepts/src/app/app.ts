import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularBasics } from './angular-basics/angular-basics';
import { DataBinding } from './data-binding/data-binding';
import { Directives } from './directives/directives';
import { Decerators } from './decerators/decerators';
import { Pipes } from './pipes/pipes';
import { Templates } from './templates/templates';
import { Header } from './app-layout/header/header';
import { Sidenav } from './app-layout/sidenav/sidenav';
import { Pagenotfound } from './pagenotfound/pagenotfound';
import { CardComponent } from './card-component/card-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularBasics, Decerators, Templates, Header, Sidenav, Pagenotfound, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Input Decerators
  title = 'Angular Input Decerator Title';
  pnumber = [10, 30, 50, 70, 90];
  userData = { name: 'Alice', age: 30 };
  
// Output Decerators
  childData:string='';
  message = '';
  receiveMessage(msg: string) {
    this.message = msg;
  }

  @ViewChild(Decerators) parentDecerator!: Decerators;
  cdata='';
  getChildData() {
    this.cdata=this.parentDecerator.passChildToParentData;
  }

}
