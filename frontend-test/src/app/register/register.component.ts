import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: '',
    email: '',
    password: '',
    role: '' // Updated to an empty string for initial state
  };
  errorMessage: string = '';
  roles: string[] = ['ST', 'RH']; // Example roles

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (!this.form.username || !this.form.email || !this.form.password || !this.form.role) {
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    // Create user object with role as an array
    const user = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      role: [this.form.role] // Send as an array
    };

    this.authService.register(user).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message || 'An error occurred during registration';
        console.log(err);
      }
    );
  }
}
