import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '../todo';
import { TodoComponent } from '../todo/todo.component';
import { NewTodoComponent } from '../new-todo/new-todo.component';
import { TodoService } from '../todo.service';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
    .then(todos => this.todos = this.todoService.todos)
    .catch(err => console.log(err));
  }

  logout() {
    this.authService.logout()
    .then(msg => {
      this.router.navigate(['login']);
      this.messageService.clear();
    })
    .catch(msg => this.messageService.add(msg + ' ' + new Date().toLocaleTimeString()));
  }
}
