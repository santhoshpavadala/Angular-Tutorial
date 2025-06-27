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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularBasics, DataBinding, Directives, Decerators, Pipes, Templates, Header, Sidenav, Pagenotfound],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Angular Input Decerator Title';
  pnumber = [10, 30, 50, 70, 90];
  childData:string='';

  @ViewChild(Decerators) parentDecerator!: Decerators;
  cdata='';
  getChildData() {
    this.cdata=this.parentDecerator.passChildToParentData;
  }

}
