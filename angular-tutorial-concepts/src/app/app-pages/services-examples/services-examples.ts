import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Mobile } from '../../services/mobile';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/jsonplaceholder/user-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user-model';
import { PostModel } from '../../models/post-model';
import { PostService } from '../../services/post-service';
import { TodoModel } from '../../models/todo-model';
import { TodoService } from '../../services/todo-service';
import { map, Subject, take, takeUntil } from 'rxjs';
@Component({
  selector: 'app-services-examples',
  imports: [CommonModule,MatCardModule],
  templateUrl: './services-examples.html',
  styleUrl: './services-examples.scss'
})
export class ServicesExamples implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  mobileList: string[] = []
  constructor(private mobileData: Mobile,
    private http: HttpClient,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.mobileList = this.mobileData.mobiles;
    this.loadUsers();
    this.loadPosts();
    this.loadTodos();
  }

  addMobile() {
    this.mobileData.mobiles.push("ZEN")
  }
  httpData: any;
  tableHeaders = ['ID', 'Name', 'Price']
  getHttpData() {
    this.http.get('https://fakestoreapi.com/products?limit=5').pipe(takeUntil(this.destroy$)).subscribe((data)=> {
      console.log(data);

      this.httpData = data;
    })
  }


  userList:User[]=[];
  loadUsers() {
    this.userService.getUser().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) =>{
        this.userList = res;
      }
    })
  }


  postList: PostModel[]=[];
  postService = inject(PostService)
  loadPosts() {
    this.postService.getPost().pipe(
      map(posts=>posts.slice(0,10)), takeUntil(this.destroy$)
    ).subscribe({
      next: (res)=>{
        this.postList= res;
      }
    })
  }

  todoList:TodoModel[] = [];
  todoService=inject(TodoService)
  loadTodos() {
    this.todoService.getTodo().pipe(
      map(todos=>todos.slice(0,10)),takeUntil(this.destroy$)
  ).subscribe({
      next: (res)=>{
        this.todoList=res;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  serviceExample = `
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = [
    { id: 1, name: 'Ravi', role: 'Angular Developer' },
    { id: 2, name: 'Kiran', role: 'Frontend Developer' }
  ];

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {
    return this.employees.find(employee => employee.id === id);
  }
}




import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  template: \`
    @for (employee of employees; track employee.id) {
      <p>{{ employee.name }} - {{ employee.role }}</p>
    }
  \`
})
export class EmployeeListComponent implements OnInit {
  employees: { id: number; name: string; role: string }[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
}
`

hirarchialDI = `
import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message = 'Global notification';
}

@Component({
  selector: 'app-child',
  standalone: true,
  template: \`<p>{{ notification.message }}</p>\`
})
export class ChildComponent {
  constructor(public notification: NotificationService) {}
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  providers: [NotificationService],
  template: \`<app-child />\`
})
export class ParentComponent {}

`

resModifier = `
import { Component, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-example',
  standalone: true,
  template: \`<p>Example</p>\`
})
export class ExampleComponent {
  notification = inject(NotificationService, {
    optional: true,
    skipSelf: true
  });
}
`

injectionToken = `
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  production: boolean;
}

export const APP_CONFIG =
  new InjectionToken<AppConfig>('APP_CONFIG');
`

injectionToken2 = `
import { ApplicationConfig } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app-config';

const config: AppConfig = {
  apiUrl: 'https://api.example.com',
  production: false
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_CONFIG,
      useValue: config
    }
  ]
};
`

injectionToken3 = `
import { Component, inject } from '@angular/core';
import { APP_CONFIG } from './app-config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \`<p>{{ apiUrl }}</p>\`
})
export class DashboardComponent {
  private config = inject(APP_CONFIG);

  apiUrl = this.config.apiUrl;
}
`

singleTon = `
import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count = 0;

  increment() {
    this.count++;
  }
}

@Component({
  selector: 'app-counter-a',
  standalone: true,
  template: \`<button (click)="counter.increment()">A: {{ counter.count }}</button>\`
})
export class CounterAComponent {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'app-counter-b',
  standalone: true,
  template: \`<p>B: {{ counter.count }}</p>\`
})
export class CounterBComponent {
  constructor(public counter: CounterService) {}
}
`
}
