import { Routes } from '@angular/router';

import { authGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordComponent } from './password/password.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'product/:id',
        component: ProductDetailComponent,
        canActivate: [authGuard]
      }
    ]
  },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'passwd_reset', component: PasswordComponent },
  { path: '**', redirectTo: '' }
];
