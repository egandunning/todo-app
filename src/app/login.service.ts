import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  private url: string = 'https://lit-plateau-37029.herokuapp.com';

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
      this.http.post(this.url + '/users/login', credentials, {observe: 'response'})
      .subscribe((res) => {
        if(res.status === 200) {
          resolve(res.headers.get('X-Auth'));
        }
        reject("Incorrect credentials");
      });
    });
  }
}
