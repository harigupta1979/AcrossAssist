import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ROLES } from '../permission-data';
import { Module, Role } from '../user-master/role.model';

@Component({
  selector: 'app-permissions-master',
  imports: [MaterialModule],
  templateUrl: './permissions-master.component.html',
  styleUrl: './permissions-master.component.css',
})
export class PermissionsMasterComponent {
  roles: Role[] = ROLES;
  selectedRole: Role | null = null;
  selectedModule: Module | null = null;
  @Output() permissionSelected = new EventEmitter<void>();

  selectRole(role: Role) {
    this.selectedRole = role;
    this.selectedModule = null;
  }

  selectModule(module: Module) {
    this.selectedModule = module;
    this.permissionSelected.emit();
  }
  selectPermission(permission: any) {
    this.permissionSelected.emit(permission); // Emit the selected permission
  }
}
