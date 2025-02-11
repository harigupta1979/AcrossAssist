import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-daynamic-side-nav',
  imports: [MaterialModule, RouterModule],
  templateUrl: './daynamic-side-nav.component.html',
  styleUrl: './daynamic-side-nav.component.css',
})
export class DaynamicSideNavComponent {
  isCollapsed = false;
  activeItem: string = '';
  constructor(private router: Router) {}
  MENU_ITEMS: any[] = [];
  ngOnInit() {
    const storedMenu = localStorage.getItem('Dynemicmenu');
    this.MENU_ITEMS = storedMenu ? JSON.parse(storedMenu) : [];
  }
  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }
  onToggleSidenav(opened: boolean) {
    this.isCollapsed = !opened;
  }
  setActive(item: string) {
    this.activeItem = item;
  }
  navigateToUserRole() {
    this.router.navigate(['user-roles-permissions']);
  }
}
