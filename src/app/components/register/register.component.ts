import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: response => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error(error);
        alert('Registration failed');
      }
    });
  }
}
