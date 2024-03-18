import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Auth';
  authService = inject(AuthService);
  router = inject(Router);

  handleClick() {
    document.body.scrollIntoView();
  }

  signout(): void {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }
}
