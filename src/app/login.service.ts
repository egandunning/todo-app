import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  private url: string = 'https://lit-plateau-37029.herokuapp.com';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): void {
    console.log(`login(${email}, ${password}) called`);
    const credentials = { email, password };
    this.http.post(this.url + '/users/login', credentials)
    .subscribe((res: Response) => {
      const headers = res.headers;
      console.log('headers:', headers);
    })
  }
}
