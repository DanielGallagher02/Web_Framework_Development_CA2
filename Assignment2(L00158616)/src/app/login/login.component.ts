import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Defining the form group for the login form
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService) {}

  // Submiting method to validate credentials and navigate
  submit() {
    const validEmail = 'thomas.devine@atu.ie'; // valid email
    const validPassword = 'letmein'; // valid password
    // Check if entered credentials match the valid credentials
    if (this.loginForm.value.email === validEmail && this.loginForm.value.password === validPassword) {
      this.authService.login(); // Call login method from AuthService
      this.router.navigate(['/admin']); // Navigate to admin page on successful login
    } else {
      alert('Invalid credentials'); // Alert user on invalid credentials
    }
  }
}



