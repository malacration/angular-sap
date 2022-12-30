import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { Login } from './model/login';
import { Session } from './model/session';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  name = 'Angular ' + VERSION.major;

  windson() {
    this.http
      .post<Session>('https://hanab1:50000/b1s/v1/Login', new Login())
      .subscribe((it) => {
        alert('Login feito com sucesso! SessionId: ' + it.SessionId);
      });
  }
}
