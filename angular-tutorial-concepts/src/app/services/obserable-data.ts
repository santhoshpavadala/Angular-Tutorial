import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, shareReplay, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserableData {
  // Subject declaration with obsData instance
  public obsData = new Subject<string>();
  public obsData2 = new Subject<any>();

  courseDuration$ = new BehaviorSubject<string>("2 Months");

  $roleBehaviour = new BehaviorSubject<string>("");
  $roleSubject = new Subject<string>();

  // share replay - storing the data which presented and not do api calls multiples once its received the data
  private userDetails = new Map<number, Observable<any>>();





  constructor() { }
  getData() {
    // Initially in service releasing the data throught next
    this.obsData.next('This is the Data, Next Function Released Data In Obserable');
    this.obsData.error('This Obs Data is not received');//Once error is came then it not gotes to complete statement
    this.obsData.complete();
  }

  getData2() {
    this.obsData2.next('This data is for NgOnInIt Example');
    this.obsData2.error('Obs NgOnInIt Data has some error');
    this.obsData2.complete();
  }



  // Real api implementation lp examples
  http=inject(HttpClient);
  getJsonData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      tap((userList:any)=>{
        console.log(userList, 'tap userlist');
      }), // tap operator is gives the entire exact original data 
      map((userList: any)=>userList.map((user:any)=>{
        return {id: user.id, name:user.name}
      }))
    );
  }

  getSingleUser(){
    return this.http.get('https://jsonplaceholder.typicode.com/users/2').pipe(
      map((userOne:any)=>userOne.address)
    )
  }

  getUserById(id:number): any {
    debugger
    // return this.http.get('https://jsonplaceholder.typicode.com/users/'+ id)
  if(!this.userDetails.has(id)) {
     // instead of multiple api calling we storing the api data with sharereply 
    const storeDataObs=this.http.get('https://jsonplaceholder.typicode.com/users/'+ id).pipe(
      shareReplay(1)
    )
    this.userDetails.set(id, storeDataObs);
  } else {
    return this.userDetails.get(id)
  }

  }


  // FORK JOIN EXAMPLES: TWO API CALLS

  private getUsers() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  private getPosts() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getDashboardData() {
    return forkJoin({
      users: this.getUsers(),
      posts: this.getPosts()
    }).pipe(
      map(({users, posts})=>{
        return users.map(user => {
          const userPosts = posts.filter(p => p.userId === user.id);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company.name,
            postCount: userPosts.length,
            latestPost: userPosts.length ? userPosts[userPosts.length - 1].title : 'No Posts'
          };

        })

      })
    )
  }

}
