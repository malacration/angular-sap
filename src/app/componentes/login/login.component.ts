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
    console.log(this.login);
    this.loginService.login(this.login).subscribe((it) => {
      localStorage.setItem('login', JSON.stringify(this.login));
      this.isLogado = true;
    });
  }

  logout() {
    localStorage.removeItem('login');
    this.isLogado = false;
  }
}
