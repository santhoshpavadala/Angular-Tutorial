import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ObserableData } from '../../services/obserable-data';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() isDarkTheme = false;
  @Input() isSidenavOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  readonly profileName = 'Santhosh Pavadala';
  profilePhotoUrl: string | null = '/assets/profile/Santhosh_Dp.png';

  // BehaviourSubject:
  obsServ = inject(ObserableData);

  constructor(private router: Router) {

  }

  id:number = 10;

  navigate() {
    this.router.navigate(['/basics', this.id, "js"], {
      queryParams: {"page": 7, "size": 20}
    })
  }

  onRoleChange(event:any){
    debugger;
    this.obsServ.$roleBehaviour.next(event.target.value);
    this.obsServ.$roleSubject.next(event.target.value);
  }

  onLogout() {
    localStorage.removeItem('loggedUserId');
    this.router.navigateByUrl('/login')
  }

  goToAdmin() {
    const role =
      localStorage.getItem('loggedRole');


    if (role === 'admin') {

      this.router.navigateByUrl(
        '/dashboard/admindashboard'
      );

    } else {

      this.router.navigateByUrl(
        '/ang-interview'
      );

    }

  }
}
