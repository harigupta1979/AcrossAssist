import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss',
})
export class TopNavbarComponent {
  constructor(private router: Router, private authservice: AuthService) {}
  viewProfile() {
    this.router.navigate(['/profile']);
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  async logout() {
    await this.authservice.logout();
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
