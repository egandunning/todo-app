import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Todo } from './todo';
import { MessageService } from './message.service';

@Injectable()
export class TodoService {

  constructor(private messageService: MessageService) { }

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

  getTodos(): Observable<Todo[]> {
    //todo: display message after fetching todos
    this.messageService.add('fetched todos. ' + new Date().toString());
    return of(this.todos);
  }
}
