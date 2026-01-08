import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../services/todo';

@Component({
  selector: 'app-todoform',
  imports: [FormsModule],
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

}
