import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { LoginComponent } from '../../auth/login/login.component';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
