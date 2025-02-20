import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoleTabsComponent } from './user-role-master/user-role-tabs/user-role-tabs.component';


export const baseRoutes: Routes =[
 
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'user-roles-permissions',
      component: UserRoleTabsComponent,
      loadChildren: () => import('./user-role-master/user-role-master.module').then(m => m.UserRoleModule) 
     },
     {
      path: 'vendor',
      loadChildren: () => import('./vendormaster/vendormaster.module').then(m => m.VendormasterModule) 
     },
     
   
  ]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes)
  ]
})
export class ComponentModule { }
