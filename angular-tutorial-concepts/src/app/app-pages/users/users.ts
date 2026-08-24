
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Usersdata } from '../../services/usersdata';
import { MatCardModule } from '@angular/material/card';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-users',
  imports: [RouterModule, MatCardModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  users: any[] = [];

  route=inject(ActivatedRoute);
  router = inject(Router);
  selectedTab = "profile";
  constructor(private userService: Usersdata ) { }
  ngOnInit(): void {
    
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUserData().subscribe({
      next: (res:any)=>{
        this.users = res;
      }
    })
  }

  searchUsers(searchText: string) {
    this.router.navigate(
      ['/users'],
      {
        queryParams: {
          search: searchText
        }
      }
    );
  }
}
