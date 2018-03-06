import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Todo } from './todo';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  private url: string = 'https://lit-plateau-37029.herokuapp.com';

  todos: Todo[] = [];

  getTodos(): Promise<any> {
    return new Promise((resolve, reject) => {

      return this.http.get<Todo[]>(this.url + '/todos', {observe: 'response'})
      .subscribe(res => {
        const data: any = res.body;
        const todoList: any[] = data.todos;
        this.todos = [];
        data.todos.forEach(todo => {
          this.todos.push(new Todo(
            todo.creator,
            todo.text,
            todo.completed,
            todo.completedAt));
        });
        this.messageService.add('fetched todos. ' + new Date().toLocaleTimeString());
        resolve(true);
      }, err => {
        this.messageService.add('failed to fetch todos. ' + new Date().toLocaleTimeString());
        reject(err);
      });
    })    
  }

  addTodo(todo: Todo): Promise<any> {    
    return new Promise((resolve, reject) => {

      //todo: use es6
      const data = { text: todo.text, completed: false };

      return this.http.post(this.url + '/todos', data, {observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {
        if(res.status === 200) {
          this.todos.unshift(todo);
          this.messageService.add('added todo. ' + new Date().toLocaleTimeString());
          return resolve(true);
        }
        this.messageService.add('failed to add todo. ' + new Date().toLocaleTimeString());
        reject(false);
      }, err => {
        this.messageService.add('failed to add todo. ' + new Date().toLocaleTimeString());
        reject(false);
      });
    });
  }
}
