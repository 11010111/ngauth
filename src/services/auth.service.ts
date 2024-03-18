import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, afterNextRender, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser?: User;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private apiURL = new URL('https://dummyjson.com/auth/login');
  private authenticated = false;
  private authKey = 'bt_';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor() {
    afterNextRender(() => {
      let authJSON = atob(sessionStorage.getItem(this.authKey) ?? '');

      if (authJSON !== '') {
        this.authUser = JSON.parse(authJSON);

        if (this.authUser?.token) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  token(): string {
    return this.authUser?.token ?? '';
  }

  user(): User | undefined {
    return this.authUser;
  }

  signin(user: User): void {
    this.httpClient.post<User>(
      this.apiURL.href, {
      username: user.username,
      password: user.password
    },
      this.httpOptions
    ).subscribe(data => {
      this.authUser = data;

      if (data.token) {
        sessionStorage.setItem(this.authKey, btoa(JSON.stringify(data)))
        this.authenticated = true;
        this.router.navigate(['/']);
      }
    });
  }

  signout(): void {
    sessionStorage.removeItem(this.authKey);
    this.authenticated = false;
    this.authUser = undefined;
  }
}
