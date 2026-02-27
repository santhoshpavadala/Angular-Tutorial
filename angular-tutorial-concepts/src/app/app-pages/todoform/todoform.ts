
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../services/todo';
import { Todolist } from '../todolist/todolist';

@Component({
  selector: 'app-todoform',
  imports: [FormsModule, Todolist],
  templateUrl: './todoform.html',
  styleUrl: './todoform.scss'
})
export class Todoform {
  todoInput: string ="";

  constructor(private ts: Todo) {}

  addTodo() {
    this.ts.addTodo(this.todoInput)
    this.todoInput="";
  }

  resetTodo() {
    this.todoInput = "";
  }

  // Subjects examples - CS World Youtube
  addTodoList(t:string) {
    this.ts.addNewTodo(t);
  }

}
