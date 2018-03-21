import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  icon: '../../assets/done.png';
  public editing: boolean = false;

  @Input() todo: Todo;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
  }

  edit() {
    this.editing = !this.editing;
  }

  update() {
    this.todoService.updateTodo(this.todo);
    this.edit();
  }

  complete() {
    this.todo.completed = !this.todo.completed;
    this.todoService.updateTodo(this.todo);
  }

}
