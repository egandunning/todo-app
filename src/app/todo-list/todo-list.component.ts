import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../todo.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }
}
