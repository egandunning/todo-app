import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  signIn() {
    this.loginService.login(this.email, this.password)
    .then(auth => console.log(auth))
    .catch(err => console.log('error:', err));
  }

  register() {
    alert('register');
  }
}
