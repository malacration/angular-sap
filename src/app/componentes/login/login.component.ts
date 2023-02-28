import { Component, OnInit } from '@angular/core';
import { Login } from '../../model/login';
import { LoginService } from '../../service/login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  isLogado: boolean = false;
  login: Login = new Login();

  ngOnInit() {
    let loginStr = localStorage.getItem('login');
    if (loginStr) {
      this.login = JSON.parse(loginStr);
      this.sigin();
    }
    if (!this.login.CompanyDB) this.login.CompanyDB = 'SBOHOMOLOG2612';
    if (!this.login.UserName) this.login.UserName = 'ROVEMA';
    if (!this.login.serviceLayer) this.login.serviceLayer = 'https://sapharovema:50000';
  }

  sigin() {
    console.log("Login ",this.login);
    this.loginService.login(this.login).subscribe((it) => {
      localStorage.setItem('login', JSON.stringify(this.login));
      localStorage.setItem('B1SESSION', it.SessionId.toString());
      this.isLogado = true;
      // this.setCookie("B1SESSION",it.SessionId,it.SessionTimeout)
    });
  }

  logout() {
    localStorage.removeItem('login');
    this.isLogado = false;
  }

  /**
     * set cookie
     * @param {string} name
     * @param {string} value
     * @param {number} expireSeconds
     * @param {string} path
     */
  public setCookie(name: string, value: string, expireSeconds: number, path: string = '') {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireSeconds * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}; SameSite=Lax`;
}
}
