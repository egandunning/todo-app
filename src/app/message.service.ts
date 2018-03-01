import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.unshift(message);
  }

  clear() {
    this.messages = [];
  }
}
