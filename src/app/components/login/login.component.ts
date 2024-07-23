import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log(this.email, this.password);
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/comics']);
      },
      error: error => {
        console.error(error);
        alert('Invalid credentials');
      }
    });
  }
}
