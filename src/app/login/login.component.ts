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
  public passwordConfirm: string;
  public registering: boolean = false;
  public errorMessage: string;

  private readonly invalidEmailMsg: string = 'Invalid email or password.';
  private readonly passwordMismatchMsg: string = 'Passwords don\'t match.';
  private readonly passwordLengthMsg: string = 'Password must be 8 or more characters.';
  private readonly registerErrorMsg: string = 'Unable to register. Probable cause: invalid email.';

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleRegistering() {
    this.errorMessage = '';
    this.registering = !this.registering;
  }

  submit() {
    this.registering ? this.register() : this.signIn();
  }

  signIn() {
    this.errorMessage = '';

    this.authService.login(this.email, this.password)
    .then(email => {
      this.messageService.add('logged in as ' + email);
      this.router.navigate(['todos']);
    })
    .catch(err => {
      console.log('error:', err);
      this.errorMessage = this.invalidEmailMsg;
    });
  }

  register() {

    this.errorMessage = '';

    //basic password validation
    if(this.password.length < 8) {
      this.errorMessage = this.passwordLengthMsg;
      return;
    }

    if(this.password != this.passwordConfirm) {
      this.errorMessage = this.passwordMismatchMsg;
      return;
    }

    this.authService.register(this.email, this.password)
    .then(email => {
      this.messageService.add('registered account: ' + email);
      this.router.navigate(['todos']);
    })
    .catch(err => {
      console.log('error:', err);
      this.errorMessage = this.registerErrorMsg;
    })
  }
}
