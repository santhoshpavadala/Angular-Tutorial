import { Component, inject, OnInit } from '@angular/core';
import {
  MapService,
  User,
} from '../../../../services/RXJS-Opearators/map-service';
import { map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Users } from '../../../users/users';

export interface FilterUserView {
  name: string;
  email: string;
  city: string;
  company: string;
  status: string;
  role: string;
  profileImage: string;
}

@Component({
  selector: 'app-rxjs-filter-dashboard',
  imports: [CommonModule, MatCardModule],
  templateUrl: './rxjs-filter-dashboard.html',
  styleUrl: './rxjs-filter-dashboard.scss',
})
export class RxjsFilterDashboard implements OnInit {
  userService = inject(MapService);
  userList: FilterUserView[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadFilteredUsers();
  }

  loadFilteredUsers() {
    const searchText = 'leanne';

    this.userService.getUsers()
      .pipe(
        // 🔥 TAP 1 - Original API Response
        tap((users) => {
          console.log(users, 'API RESPONSE');
          console.log(users.length, 'Length Of Users');
        }),

        // 🔥 TAP 2 - Loader Start
        tap(() => {
          this.isLoading = true;
          console.log('Dashboard Loaded');
        }),

        // 🔥 MAP
        map((users: User[]) =>
          users.filter(
              (user) =>
                user.id % 2 === 0 && user.address.city !== '',

              // 👇 More Examples
              // user.id % 2 !== 0
              // user.id % 3 === 0
              // user.company.name === 'Romaguera-Crona'
              // user.address.city === 'Gwenborough'
              // user.name
              //   .toLowerCase()
              //   .includes(searchText)
              // user.email.includes('@')
            )

            // 🔥 TRANSFORM
            .map((user) => ({
              name: user.name.toUpperCase(),
              email: user.email.toLowerCase(),
              city: user.address.city,
              company: user.company.name,
              status: user.id % 2 === 0 ? 'Active' : 'Inactive',
              role: user.id % 3 === 0 ? 'Admin' : 'User',
              profileImage: `https://i.pravatar.cc/150?img=${user.id}`,
            })),
        ),

        // 🔥 TAP 3 - Final Transformed Data
        tap((users) => {
          console.log(users.length, 'Final Filtered Users');
          console.log(users, 'Final User Data');
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res: FilterUserView[]) => {
          this.userList = res;
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
}
