import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../services/jsonplaceholder/user-service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-ang-material',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './ang-material.html',
  styleUrl: './ang-material.scss'
})
export class AngMaterial implements OnInit, AfterViewInit {

  private userService = inject(UserService);

  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'city',
    'phone'
  ];

  dataSource = new MatTableDataSource<User>([]);

  isLoading = false;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // Connect paginator whenever it appears in the view
  @ViewChild(MatPaginator)
  set matPaginator(paginator: MatPaginator | undefined) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  // Connect sorting whenever it appears in the view
  @ViewChild(MatSort)
  set matSort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  constructor() {
    // Support sorting for the nested address.city property
    this.dataSource.sortingDataAccessor = (
      user: User,
      property: string
    ): string | number => {
      switch (property) {
        case 'city':
          return user.address.city;
        default:
          return user[property as keyof User] as string | number;
      }
    };
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUser()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (users: User[]) => {
          this.dataSource.data = users;
        },
        error: () => {
          this.errorMessage = 'Failed to load users. Please try again.';
        }
      });
  }
}


// import {
//   Component,
//   effect,
//   inject,
//   OnInit,
//   signal,
//   viewChild
// } from '@angular/core';

// import { CommonModule } from '@angular/common';
// import { finalize } from 'rxjs';

// import {
//   MatTableDataSource,
//   MatTableModule
// } from '@angular/material/table';

// import {
//   MatSort,
//   MatSortModule
// } from '@angular/material/sort';

// import {
//   MatPaginator,
//   MatPaginatorModule
// } from '@angular/material/paginator';

// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatButtonModule } from '@angular/material/button';

// import { UserService } from '../../services/jsonplaceholder/user-service';
// import { User } from '../../models/user-model';

// @Component({
//   selector: 'app-ang-material',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatProgressSpinnerModule,
//     MatButtonModule
//   ],
//   templateUrl: './ang-material.html',
//   styleUrl: './ang-material.scss'
// })
// export class AngMaterial implements OnInit {

//   private userServiceData = inject(UserService);

//   displayedColumns: string[] = [
//     'id',
//     'name',
//     'username',
//     'email',
//     'city',
//     'phone'
//   ];

//   dataSource = new MatTableDataSource<User>([]);

//   // Signal-based component state
//   isLoading = signal(false);
//   errorMessage = signal('');

//   // Signal-based view queries
//   paginator = viewChild(MatPaginator);
//   sort = viewChild(MatSort);

//   constructor() {

//     // Connect paginator and sorting whenever they become available
//     effect(() => {
//       const paginator = this.paginator();
//       const sort = this.sort();

//       if (paginator) {
//         this.dataSource.paginator = paginator;
//       }

//       if (sort) {
//         this.dataSource.sort = sort;
//       }
//     });

//     // Handle nested city property while sorting
//     this.dataSource.sortingDataAccessor = (
//       user: User,
//       property: string
//     ): string | number => {
//       if (property === 'city') {
//         return user.address.city;
//       }

//       return user[property as keyof User] as string | number;
//     };
//   }

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   // Fetch users from the API
//   loadUsers(): void {

//     this.isLoading.set(true);
//     this.errorMessage.set('');

//     this.userServiceData.getUser()
//       .pipe(
//         finalize(() => {
//           this.isLoading.set(false);
//         })
//       )
//       .subscribe({
//         next: (users: User[]) => {
//           this.dataSource.data = users;
//         },

//         error: () => {
//           this.errorMessage.set(
//             'Failed to load users. Please try again.'
//           );
//         }
//       });
//   }
// }