import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './app-layout/header/header';
import { Sidenav } from './app-layout/sidenav/sidenav';
import { LifecycleHooks } from './app-pages/lifecycle-parent/lifecycle-hooks/lifecycle-hooks';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
