import { Component, OnInit } from '@angular/core';
import { Todo } from '../../services/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule],
  templateUrl: './todolist.html',
  styleUrl: './todolist.scss'
})
export class Todolist implements OnInit {
  tododata:any;
  constructor(private ts: Todo) {}

  ngOnInit(): void {
    this.tododata=this.ts.todolist
  }

  removeTodo(indexNumber: number) {
    this.ts.deleteTodo(indexNumber)
  }

}
