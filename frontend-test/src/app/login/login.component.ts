import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (!this.form.username || !this.form.password) {
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    this.authService.login(this.form).subscribe(
      data => {
        localStorage.setItem('token', data.accessToken);
        this.router.navigate(['home']);
      },
      err => {
        this.errorMessage = err.error.message || 'Invalid username or password';
        console.error(err);
      }
    );
  }
}
