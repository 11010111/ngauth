import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(6),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required
    ])
  });

  ngOnInit(): void {
    if (
      this.authService.isAuthenticated() && (
        this.router.url.match('/signin') ||
        this.router.url.match('/signup') ||
        this.router.url.match('/passwd_reset')
      )
    ) {
      this.router.navigate(['/']);
    }
  }

  handleSubmit() {
    if (this.loginForm.valid && this.loginForm.dirty) {
      console.log(
        this.loginForm.get('email')?.value
      );

      this.loginForm.reset();
      this.router.navigate(['/signin']);
    }
  }
}
