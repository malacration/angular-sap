import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Session } from '../model/session';
import { ConfigService } from './config-service';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  url = this.config.host + '/b1s/v1/Login';

  login(login: Login): Observable<Session> {
    this.config.host = login.serviceLayer
    this.url = this.config.host + '/b1s/v1/Login'
    return this.http.post<Session>(this.url, login);
  }
}
