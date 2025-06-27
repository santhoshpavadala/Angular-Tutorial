import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usersdata } from '../../services/usersdata';

@Component({
  selector: 'app-users',
  imports: [CommonModule,RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  users: any[] = []; // Declare users to avoid the template error

  constructor(private userService: Usersdata ) { }

  ngOnInit(): void {
    this.users = this.userService.users; // Assign from service
  }

}
