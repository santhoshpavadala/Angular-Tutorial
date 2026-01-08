import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Todo {
  taskId = 2
  todolist = [
    {"id": 1, "task": "Its a Sample Task"}
  ]
  constructor() { }

  addTodo(taskName: string) {
    this.todolist.push({"id": this.taskId++, "task": taskName })
  }

  deleteTodo(index: number) {
    this.todolist.splice(index, 1)
  }
}
