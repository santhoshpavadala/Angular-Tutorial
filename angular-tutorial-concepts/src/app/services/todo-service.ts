import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../models/todo-model';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  apiUrl="https://jsonplaceholder.typicode.com/todos"

  getTodo() {
    return this.http.get<TodoModel[]>(this.apiUrl)
  }
  
}
