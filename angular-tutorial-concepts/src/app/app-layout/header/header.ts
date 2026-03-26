import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ObserableData } from '../../services/obserable-data';

@Component({
  selector: 'app-header',
  imports: [RouterModule ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  // BehaviourSubject:
  obsServ = inject(ObserableData);

  constructor(private r: Router) {

  }

  id:number = 10;

  navigate() {
    this.r.navigate(['/basics', this.id, "js"], {
      queryParams: {"page": 7, "size": 20}
    })
  }

  onRoleChange(event:any){
    debugger;
    this.obsServ.$roleBehaviour.next(event.target.value);
    this.obsServ.$roleSubject.next(event.target.value);
  }
}
