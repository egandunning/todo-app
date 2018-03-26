import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Todo } from './todo';
import { MessageService } from './message.service';
import { ConfigService } from './config.service';
import { Config } from './config';

@Injectable()
export class TodoService {

  private static url: string;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private configService: ConfigService
  ) { }

  todos: Todo[] = [];

  async getTodos(): Promise<any> {

    const configData: any = this.configService.config || await this.configService.getConfig();

    return new Promise((resolve, reject) => {

      return this.http.get<Todo[]>(configData.todoUrl + '/todos', {observe: 'response'})
      .subscribe(res => {
        const data: any = res.body;
        const todoList: any[] = data.todos;
        this.todos = [];
        data.todos.forEach(todo => {
          this.todos.unshift(new Todo(
            todo._id,
            todo.creator,
            todo.text,
            todo.completed,
            todo.completedAt));
        });
        if(res.status === 200) {
          this.messageService.add('fetched todos. ' + new Date().toLocaleTimeString());
          resolve(true);
        } else {
          this.messageService.add('failed to fetch todos. ' + new Date().toLocaleTimeString());
          reject(res.status);
        }
      }, err => {
        this.messageService.add('failed to fetch todos. ' + new Date().toLocaleTimeString());
        reject(err);
      });
    })    
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const configData: any = this.configService.config || await this.configService.getConfig();

    return new Promise<Todo>((resolve, reject) => {
      return this.http.patch(configData.todoUrl + '/todos/' + todo._id, todo, {observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {
        if(res.status === 200) {
          this.messageService.add('todo updated. ' + new Date().toLocaleTimeString());
          return resolve(res.body.todo);
        }
        this.messageService.add('failed to update todo. ' + new Date().toLocaleTimeString());
        reject(null);
      }, err => {
        this.messageService.add('failed to update todo. ' + new Date().toLocaleTimeString());
        reject(null);
      })
    });
  }

  async deleteTodo(todoId: string): Promise<any> {
    
    const configData: any = this.configService.config || await this.configService.getConfig();

    return new Promise((resolve, reject) => {
      return this.http.delete(configData.todoUrl + '/todos/' + todoId, {observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {
        if(res.status === 200) {
          this.todos = this.todos.filter(todo => todo._id != todoId);
          this.messageService.add('deleted todo. ' + new Date().toLocaleTimeString());
          return resolve(true);
        }
        this.messageService.add('failed to delete todo. ' + new Date().toLocaleTimeString());
        reject(false);
      }, err => {
        this.messageService.add('failed to delete todo. ' + new Date().toLocaleTimeString());
        reject(false);
      });
    });
  }

  async addTodo(todo: Todo): Promise<any> {

    const configData: any = this.configService.config || await this.configService.getConfig();

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
