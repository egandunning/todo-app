import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Config } from './config';

@Injectable()
export class ConfigService {

  private configUrl = 'assets/config.json';

  public config: Config;

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl)
    .subscribe(data => {
      this.config = data;
    });
  }
}
