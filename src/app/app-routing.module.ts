import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodoListComponent }
]

@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule {

}
