import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // Fetch the token from storage

    if (token) {
      return true;
    }

    this.authService.logout(); // Clear session if token is invalid
    this.router.navigate(['/auth/login']); // Redirect to login page
    return false;
  }
}
