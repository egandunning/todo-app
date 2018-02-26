import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  icon: '../../assets/done.png';

  @Input() text: string;
  @Input() completed: boolean;
  @Input() completedAt: number;

  constructor() { }

  ngOnInit() {
  }

  complete() {
    this.completed = !this.completed;
  }

}
