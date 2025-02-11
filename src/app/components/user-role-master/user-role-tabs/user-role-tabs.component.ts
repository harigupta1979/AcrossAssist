import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserFromComponent } from '../user-from/user-from.component';
import { RoleFormComponent } from '../role-form/role-form.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-role-tabs',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './user-role-tabs.component.html',
  styleUrl: './user-role-tabs.component.css',
})
export class UserRoleTabsComponent {
  selectedTabIndex = 0;
  isSidePanelOpen = false;
  selectedPermission: any = null;
  selectedRole: any = null;
  selectedModule: any = null;
  isDrawerOpen = false;
  isSaveVisible = true;
  drawerTitle: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveTab();
      }
    });
    this.setActiveTab(); // For initial load
  }

  setActiveTab() {
    const currentRoute = this.route.firstChild?.snapshot.url[0]?.path;
    switch (currentRoute) {
      case 'user':
        this.selectedTabIndex = 0;
        break;
      case 'role':
        this.selectedTabIndex = 1;
        break;
      case 'permission':
        this.selectedTabIndex = 2;
        break;
      default:
        this.selectedTabIndex = 0;
    }
  }

  onTabChange(index: number) {
    const routes = ['user', 'role', 'permission'];
    this.router.navigate([routes[index]], { relativeTo: this.route });
    this.selectedTabIndex = index;
    this.isSaveVisible = false;
    ('');
  }
  onPermissionSelect(permission: any) {
    this.selectedPermission = permission;
    this.isSaveVisible = true;
  }

  openUserForm(): void {
    this.dialog
      .open(UserFromComponent, {
        width: '500px',
        disableClose: true,
        data: {
          /* Data passed to the dialog */
        },
        position: {
          right: '0px',
          top: '50px',
        },
      })
      .afterClosed()
      .subscribe((result: { success: boolean }) => {
        if (result && result.success) {
          console.log('User added successfully:', result);
        }
      });
  }

  openRoleForm(): void {
    this.dialog
      .open(RoleFormComponent, {
        width: '500px',
        disableClose: true,
        data: {},
        position: {
          right: '0px',
          top: '50px',
        },
      })
      .afterClosed()
      .subscribe((result: { success: boolean }) => {
        if (result && result.success) {
          console.log('Role added successfully:', result);
        }
      });
  }

  savePermissions() {
    this.isSaveVisible = false;
  }
  closeDrawer() {}
}
