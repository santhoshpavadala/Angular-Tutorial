import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor(private r: Router) {

  }

  id:number = 10;

  navigate() {
    this.r.navigate(['/basics', this.id, "js"], {
      queryParams: {"page": 7, "size": 20}
    })
  }
}
