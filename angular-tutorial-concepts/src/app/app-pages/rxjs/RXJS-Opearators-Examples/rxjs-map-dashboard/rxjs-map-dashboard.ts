import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MapService,
  User,
} from '../../../../services/RXJS-Opearators/map-service';
import {
  catchError,
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  forkJoin,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface UserView {
  name: string;
  email: string;
  city: string;
  company: string;
  statusBadge: string;
  theme: string;
  profileImage: string;
  totalUsers: number;
  initials: string;
  notification: string;
  role: string;
  progress: number;
  canEdit: boolean;
  searchText: string;
}

export interface DashboardSummary {
  totalUsers: number;
  totalPosts: number;
  totalTodos: number;
}

@Component({
  selector: 'app-rxjs-map-dashboard',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './rxjs-map-dashboard.html',
  styleUrl: './rxjs-map-dashboard.scss',
})
export class RxjsMapDashboard implements OnInit {
  userService = inject(MapService);
  // Controls
  searchControl = new FormControl('');
  companyControl = new FormControl('');
  cityControl = new FormControl('');

  companyList: string[] = [];
  cityList: string[] = [];
  userList: UserView[] = [];

  isLoading: boolean = false;

  ngOnInit(): void {
    this.initializeFilters();
    this.loadDropdownData();
    this.loadDashboardSummary();
  }

  loadDropdownData() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        // ... To convert the Set back into an array., 
        // new Set() - To remove duplicate values from an array.
        this.companyList = [...new Set(users.map((user) => user.company.name))];
        this.cityList = [...new Set(users.map((user) => user.address.city))];
      },
    });
  }

  initializeFilters() {
    combineLatest([
      this.searchControl.valueChanges.pipe(startWith('')),
      this.companyControl.valueChanges.pipe(startWith('')),
      this.cityControl.valueChanges.pipe(startWith('')),
    ])
      .pipe(
        debounceTime(500),
        switchMap(([search, company, city]) =>
          this.userService.getUsers().pipe(
            tap(() => {
              this.isLoading = true;
            }),
            delay(5000),
            map((users: User[]) =>
              users.map((user) => ({
                  name: user.name.toUpperCase(),
                  email: user.email.toLowerCase(),
                  city: user.address.city,
                  company: user.company.name,
                  statusBadge: user.id % 2 === 0 ? 'Active' : 'Inactive',
                  theme: user.id % 2 === 0 ? 'dark-card' : 'light-card',
                  profileImage: `https://i.pravatar.cc/150?img=${user.id}`,
                  totalUsers: users.length,
                  initials: user.name
                    .split(' ')
                    .map((word) => word.charAt(0))
                    .join(''),
                  notification: `${user.name} joined ${user.company.name}`,
                  role: user.id % 3 === 0 ? 'Admin' : 'User',
                  progress: user.id * 10,
                  canEdit: user.id <= 5,
                  searchText: `
                    ${user.name}
                    ${user.email}
                    ${user.company.name}
                    ${user.address.city}
                    ${user.id % 3 === 0 ? 'Admin' : 'User'}
                    `.toLowerCase(),
                    }))

                .filter((user) => {
                  const matchesSearch = user.searchText.includes(
                    (search || '').toLowerCase(),
                  );

                  const matchesCompany = !company || user.company === company;

                  const matchesCity = !city || user.city === city;

                  return matchesSearch && matchesCompany && matchesCity;
                }),
            ),
            catchError(error => {
              console.log(error);
              return of([]);
            }),
            finalize(() => {
              this.isLoading = false;
            })
          ),
        ),
        
      )
      .subscribe({
        next: (res: UserView[]) => {
          this.userList = res;
        },
      });
  }


  

  // ForkJoin Examples;
  dashboardSummary: DashboardSummary = {
    totalUsers: 0,
    totalPosts: 0,
    totalTodos: 0
  }
  loadDashboardSummary() {
    tap(()=>{
      this.isLoading = true
    }),
    delay(5000),
    forkJoin({
      users: this.userService.getUsers(),
      posts: this.userService.getPosts(),
      todos: this.userService.getTodos()
    }).pipe(
      map(res=>({
        totalUsers: res.users.length,
        totalPosts: res.posts.length,
        totalTodos: res.todos.length
      })),
      finalize(()=>{
        this.isLoading = false
      })
    ).subscribe({
      next: (res:DashboardSummary)=>{
        this.dashboardSummary = res;
        console.log(res,' responsefork');
        
      }
    })
  }

}
