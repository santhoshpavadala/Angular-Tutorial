import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Todo {
  taskId = 2
  todolist = [
    {"id": 1, "task": "Its a Sample Task"}
  ]

  // Subjects examples - CS World Youtube
  todos = [
    'task1',
    'task2',
    'task3'
  ]
  todoSubject=new Subject();




  constructor() { 
    // Subjects examples - CS World Youtube
    this.sendTodos()
   }

  addTodo(taskName: string) {
    this.todolist.push({"id": this.taskId++, "task": taskName })
  }

  deleteTodo(index: number) {
    this.todolist.splice(index, 1)
  }

  // Subjects examples - CS World Youtube
  sendTodos() {
    this.todoSubject.next(this.todos)
  }
  addNewTodo(t:any) {
    this.todos.push(t); // Push is to use add data to that array
    this.sendTodos(); //again updating new arry for sendtodos
  }
}
