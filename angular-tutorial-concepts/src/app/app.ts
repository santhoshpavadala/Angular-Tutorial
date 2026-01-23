import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularBasics } from './app-pages/angular-basics/angular-basics';
import { Decerators } from './app-pages/decerators/decerators';
import { Templates } from './app-pages/templates/templates';
import { Header } from './app-layout/header/header';
import { Sidenav } from './app-layout/sidenav/sidenav';
import { Pagenotfound } from './app-pages/pagenotfound/pagenotfound';
import { CardComponent } from './app-pages/card-component/card-component';
import { DecoratorParent } from './app-pages/decorator-parent/decorator-parent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  

}
