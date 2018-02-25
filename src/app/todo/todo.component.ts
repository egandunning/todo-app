import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() text: string;
  @Input() completed: boolean;
  @Input() completedAt: number;

  constructor() { }

  ngOnInit() {
  }

}
