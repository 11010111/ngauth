import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordValidator } from '../../directives/password-validator.directive';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(32),
      Validators.pattern('^(?=.*[a-zA-Z]).{3,32}$'),
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(6),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(63),
      Validators.pattern('^(?=.*[0-9a-zA-Z]).{6,63}$'),
      Validators.required
    ]),
    password_repeat: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(63),
      Validators.pattern('^(?=.*[0-9a-zA-Z]).{6,63}$'),
      Validators.required
    ])
  }, { validators: passwordValidator });

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

  handleSubmit(e: SubmitEvent) {
    if (!this.loginForm.valid) {
      e.preventDefault();
      e.stopPropagation();
      return
    }

    this.loginForm.reset();
    this.router.navigate(['/signin']);
  }
}
