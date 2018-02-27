import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  icon: '../../assets/done.png';

  @Input() todo: Todo;

  constructor() { }

  ngOnInit() {
  }

  complete() {
    this.todo.completed = !this.todo.completed;
  }

}
