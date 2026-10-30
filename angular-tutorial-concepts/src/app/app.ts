import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  ngOnInit(): void {
    document.documentElement.dataset['theme'] =
      localStorage.getItem('app-theme') === 'dark' ? 'dark' : 'light';
  }
}
