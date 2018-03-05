import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    req.headers.set('X-Auth', AuthService.token);
    req.headers.append('X-Auth', AuthService.token);
    const modified = req.clone({ setHeaders: { 'X-Auth': AuthService.token || '' } });
    console.log(modified.headers);
    return next.handle(modified);
  }
}