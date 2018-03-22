import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  private url: string = 'https://lit-plateau-37029.herokuapp.com';

  public static token: string;

  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to /users/login with email and password. If these
   * credentials are correct, then a token is sent back in the X-Auth header.
   * @param email The email of the user attempting to login.
   * @param password The password of the user attempting to login.
   * @returns The token wrapped in a Promise.
   */
  login(email: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      const storedAuth = window.localStorage.getItem('auth');
      if(storedAuth) {
        console.log('from localStorage:', storedAuth);
        AuthService.token = storedAuth;
      }

      const credentials = { email, password };
      this.http.post(this.url + '/users/login', credentials, { observe: 'response' })
      .subscribe((res) => {
        const body: any = res.body;
        if(res.status === 200) {
          AuthService.token = res.headers.get('X-Auth');
          window.localStorage.setItem('auth', AuthService.token);
          window.localStorage.setItem('email', email);
          resolve(body.email);
        }
        //todo: test
        reject(body.message);
      }, (err) => {
        reject(err);
      });
    });
  }

  register(email: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const credentials = { email, password };
      this.http.post(this.url + '/users', credentials, { observe: 'response' })
      .subscribe((res) => {
        const body: any = res.body;
        if(res.status === 200) {
          AuthService.token = res.headers.get('X-Auth');
          resolve(body.email);
        }
        //todo: test
        reject(body.message);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout(): Promise<string> {
    
    return new Promise<string>((resolve, reject) => {

      let user = { email: window.localStorage.getItem('email') };

      this.http.request('delete', this.url + '/users/me/token', { observe: 'response', body: user })
      .subscribe((res) => {
        const body: any = res.body;
        if(res.status === 200) {
          window.localStorage.setItem('auth', '');
          resolve('logout successful');
          //route to login
        } else {
          reject('logout unsuccessful');
        }
      }, (err) => {
        reject('logout usuccessful');
      });
    });
  }
}
