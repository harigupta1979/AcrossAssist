import { Component } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { TopNavbarComponent } from '../topnavabar/top-navbar.component';
import { MaterialModule } from '../../shared/material.module';
import { DaynamicSideNavComponent } from '../daynamic-side-nav/daynamic-side-nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
