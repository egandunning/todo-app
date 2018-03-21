import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  todo: Todo = {
    _id: '', //server will fill this in
    creator: 'test',
    text: '',
    completed: false,
    completedAt: null
  };

  private creator: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  submitTodo() {
    this.todoService.addTodo(Object.assign({}, this.todo));
    this.todo.text = '';
  }
}
