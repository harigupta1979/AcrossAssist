import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/authlayout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './Services/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'otp-verification', component: OtpVerificationComponent },
      { path: 'set-password', component: SetPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/components/component.module').then(m => m.ComponentModule)
  },
  { path: '**', component: PageNotFoundComponent },
];
