import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularBasics } from './angular-basics/angular-basics';
import { DataBinding } from './data-binding/data-binding';
import { Directives } from './directives/directives';
import { Decerators } from './decerators/decerators';
import { Pipes } from './pipes/pipes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularBasics, DataBinding, Directives, Decerators, Pipes],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'angular-tutorial-concepts';
  pnumber = [10, 30, 50, 70, 90];

  childData:string='';
}
