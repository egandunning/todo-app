import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: AuthService,
      private messageService: MessageService) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.login(this.email, this.password)
    .then(email => {
      this.messageService.add('logged in as ' + email);
    })
    .catch(err => console.log('error:', err));
  }

  register() {
    alert('register');
  }
}
