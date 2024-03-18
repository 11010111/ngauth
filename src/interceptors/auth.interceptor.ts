import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const authToken = authService.token();
    const newRequest = req.clone({
      // withCredentials: true,
      setHeaders: {
        Authorization: authToken
      }
    });

    return next(newRequest);
  } else {
    return next(req);
  }
};
