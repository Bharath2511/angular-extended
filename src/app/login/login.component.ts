import { Component } from '@angular/core';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  login() {
    if (this.email === 'admin@gmail.com' && this.password === 'Admin') {
      alert('Login Successfull');
    }
  }
}
