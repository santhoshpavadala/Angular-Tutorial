import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiUrl:string = "https://jsonplaceholder.typicode.com/users"

  getUser() {
    return this.http.get<User[]>(this.apiUrl);
  }
  
}
