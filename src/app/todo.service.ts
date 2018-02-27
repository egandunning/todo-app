import { Injectable } from '@angular/core';

import { Todo } from './todo';

@Injectable()
export class TodoService {

  constructor() { }

  getTodos() {
    return [
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
  }
}
