import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('kminchelle', [
      Validators.minLength(3),
      Validators.maxLength(32),
      Validators.pattern('^(?=.*[a-zA-Z]).{3,32}$'),
      Validators.required
    ]),
    password: new FormControl('0lelplR', [
      Validators.minLength(6),
      Validators.maxLength(63),
      Validators.pattern('^(?=.*[0-9a-zA-Z]).{6,63}$'),
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

  handleSubmit(e: SubmitEvent) {
    if (!this.loginForm.valid) {
      e.preventDefault();
      e.stopPropagation();
      return
    }

    const user: User = {
      username: this.loginForm.get('username')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? ''
    };

    this.authService.signin(user);
    this.loginForm.reset();
  }
}
