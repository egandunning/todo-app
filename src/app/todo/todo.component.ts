import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  icon: '../../assets/done.png';

  @Input() todo: Todo;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
  }

  complete() {
    this.todo.completed = !this.todo.completed;
    this.todoService.updateTodo(this.todo);
  }

}
