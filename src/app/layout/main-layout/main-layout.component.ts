import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';
import { TopNavbarComponent } from '../../components/topnavabar/top-navbar.component';
import { DaynamicSideNavComponent } from '../../components/daynamic-side-nav/daynamic-side-nav.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    MaterialModule,
    RouterModule,
    DaynamicSideNavComponent,
    TopNavbarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
