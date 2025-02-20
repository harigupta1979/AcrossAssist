import { Component, isStandalone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/authlayout/layout.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Acrossassist-front';
}
