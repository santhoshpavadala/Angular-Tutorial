import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

@Injectable({
  providedIn: 'root',
})

export class MapService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private postUrl = "https://jsonplaceholder.typicode.com/posts"
  private todoUrl = "https://jsonplaceholder.typicode.com/todos"

  http = inject(HttpClient);

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getPosts():Observable<post[]> {
    return this.http.get<post[]>(this.postUrl)
  }

  getTodos(): Observable<todo[]> {
    return this.http.get<todo[]> (this.todoUrl)
  }
  
}
