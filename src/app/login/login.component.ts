import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.login(this.email, this.password)
    .then(email => {
      this.messageService.add('logged in as ' + email);
      this.router.navigate(['todos']);
    })
    .catch(err => {
      console.log('error:', err);
      this.messageService.add('invalid credentials');
    });
  }

  register() {
    this.authService.register(this.email, this.password)
    .then(email => {
      this.messageService.add('registered account: ' + email);
      this.router.navigate(['todos']);
    })
    .catch(err => {
      console.log('error:', err);
      this.messageService.add('unable to register');
    })
  }
}
