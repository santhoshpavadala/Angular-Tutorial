import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user-model';
import { Observable } from 'rxjs';
import { Employee } from '../../ngrx/employee-selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiUrl:string = "https://jsonplaceholder.typicode.com/users"

  getUser() {
    return this.http.get<User[]>(this.apiUrl);
  }

   getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  
}
