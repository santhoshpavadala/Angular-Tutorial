import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ang-unsubscribe',
  imports: [CommonModule],
  templateUrl: './ang-unsubscribe.html',
  styleUrl: './ang-unsubscribe.scss',
})
export class AngUnsubscribe implements OnInit, OnDestroy{

  http = inject(HttpClient);
  userList:any[]=[];
  postList:any[]=[];

  // Way 1 - For signle subscription
  subscription!:Subscription;

  // Way 2 - if multiple api calls exist
  subscriptionList:Subscription[] = [];

  // Way 3 - Take Untill method;
  subTakeUntill!: Subject<void>;
  
  // Way 4 - Take

  // Way 5 - async if its use memory doesnot leaks 
  userList$ = new Observable<any[]> 

  ngOnInit(): void {
  // Way 5 - async if its use memory doesnot leaks 
  this.userList$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');

    this.getUsers();
    this.getPosts();
  }

  // Default calling
  // getUsers() {
  //   this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
  //     next: (res:any)=> {
  //       this.userList = res
  //     },
  //     error: (error)=>{}
  //   })
  // }

  // Way 1 - For signle subscription
  // getUsers() {
  //   this.subscription = this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
  //     next: (res:any)=> {
  //       this.userList = res
  //     },
  //     error: (error)=>{}
  //   })
  // }

  // Way 2 - For Multiple subscription
  // getUsers() {
  //   this.subscriptionList.push( this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
  //       next: (res:any)=> {
  //         this.userList = res
  //       },
  //       error: (error)=>{}
  //     })
  //   )
  // }

  // Way 3 - By Using TakeUntill
  // getUsers() {
  //   this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
  //     takeUntil(this.subTakeUntill)
  //   ).subscribe((res:any)=>{

  //   })
  // }

  // Way 3 - By Using TakeUntill
  getUsers() {
    this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      // It will subscribes only once
      take(1)
    ).subscribe((res:any)=>{

    })
  }



  getPosts() {
    // Alternative for array subscription pushing same with above example 
    const sub = this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
      next: (res:any)=>{
        this.postList = res
      },
      error: (err)=>{}
    })
    this.subscriptionList.push(sub);
  }




  ngOnDestroy(): void {
  // Way 1 - For signle subscription
    this.subscription.unsubscribe();

  // Way 2 - For multiple api subscription
    this.subscriptionList.forEach(sub=>{
      sub.unsubscribe();
    })

    // Way 3 - TakeUntill
    this.subTakeUntill.next();
    // this.destroy$.complete();


  }



}
