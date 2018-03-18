import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Todo } from './todo';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Config } from './config';

@Injectable()
export class TodoService {

  private static url: string;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService,
    private configService: ConfigService
  ) { }

  todos: Todo[] = [];

  async getTodos(): Promise<any> {

    const configData: any = this.configService.config || await this.configService.getConfig();
    console.log("config data:", configData);

    return new Promise((resolve, reject) => {

      return this.http.get<Todo[]>(configData.todoUrl + '/todos', {observe: 'response'})
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

  async addTodo(todo: Todo): Promise<any> {
    const configData: any = this.configService.config || await this.configService.getConfig();
    console.log("config data:", configData);
    return new Promise((resolve, reject) => {

      //todo: use es6
      const data = { text: todo.text, completed: false };

      return this.http.post(configData.todoUrl + '/todos', data, {observe: 'response'})
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
