import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VendorListComponent } from './vendor-list/vendor-list.component';

export const baseRoutes: Routes = [
  { path: 'list', component: VendorListComponent },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes)
  ]
})
export class VendormasterModule { }
