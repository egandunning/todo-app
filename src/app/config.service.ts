import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig(): any {
    return this.http.get('assets/config.json');
  }
}
