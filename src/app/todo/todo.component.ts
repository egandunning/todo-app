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
  public exists: boolean = true;
  public prettyDate: string = '';

  @Input() todo: Todo;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.formatDate();
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
    this.todoService.getTodos()
    .then(todos => {
      this.todo = this.todoService.todos.find(todo => todo._id === this.todo._id);
      this.formatDate();
    })
    .catch(err => console.log('error fetching todos'));
  }

  delete() {
    this.todoService.deleteTodo(this.todo._id);
    this.exists = false;
  }

  formatDate() {
    if(!this.todo.completed) {
      this.prettyDate = '';
      return;
    }

    let prettyString: string = new Date(this.todo.completedAt).toString();
    //remove the GMT offset from string
    this.prettyDate = prettyString.replace(/GMT-\d* /, '');
  }
}
