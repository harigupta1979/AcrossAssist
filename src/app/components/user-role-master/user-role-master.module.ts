import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserMasterComponent } from './user-master/user-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { PermissionsMasterComponent } from './permissions-master/permissions-master.component';

export const baseRoutes: Routes = [
    { path: 'user', component: UserMasterComponent },
    { path: 'role', component: RoleMasterComponent },
    { path: 'permission', component: PermissionsMasterComponent },
    { path: '', redirectTo: 'user', pathMatch: 'full' }, // Default tab
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes)
  ]
})
export class UserRoleModule { }
