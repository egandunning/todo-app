import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [
    new Todo(
      'test',
      'do the dishes',
      false,
      null  
    ),
    new Todo(
      'test',
      'clean the kitchen',
      false,
      null
    ),
    new Todo(
      'test',
      'drive to MN',
      true,
      null
    )
  ];

  constructor() { }

  ngOnInit() {
  }

}
