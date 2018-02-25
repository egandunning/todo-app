import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../todo';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  todo: Todo = {
    creator: 'test',
    text: '',
    completed: false,
    completedAt: null
  };

  constructor() { }

  ngOnInit() {
  }

  submitTodo() {
    alert("todo: send this to server:" + this.todo.text);
    this.todo.text = '';
  }
}
