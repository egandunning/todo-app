import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  private url: string = 'https://lit-plateau-37029.herokuapp.com';

  //TODO: find better solution - research singletons in TS
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
      const credentials = { email, password };
      this.http.post(this.url + '/users/login', credentials, { observe: 'response' })
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
    })
  }
}
