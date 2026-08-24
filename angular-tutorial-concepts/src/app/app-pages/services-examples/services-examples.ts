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
}
