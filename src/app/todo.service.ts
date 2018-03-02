import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from './todo';
import { MessageService } from './message.service';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private url: string = 'https://lit-plateau-37029.herokuapp.com';

  todos: Todo[] = [
    new Todo('test', 'do the dishes', false, null),
    new Todo('test', 'clean the kitchen', false, null),
    new Todo('test', 'drive to MN', true, null)
  ];

  getTodos(): Observable<Todo[]> {
    //todo: display message after fetching todos
    this.messageService.add('fetched todos. ' + new Date().toLocaleDateString());
    return this.http.get<Todo[]>(this.url + '/todos');
  }

  addTodo(todo: Todo) {
    //todo: send to server
    this.todos.unshift(todo);
    this.messageService.add('added todo. ' + new Date().toLocaleDateString());
  }
}
