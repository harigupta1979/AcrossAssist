import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ROLES } from '../permission-data';
import { Module, Role } from '../user-master/role.model';
import { dbCommonService } from '../../service/commonservice.service';
import { dbUserRoleService } from '../../service/user-role.service';

@Component({
  selector: 'app-permissions-master',
  imports: [MaterialModule],
  templateUrl: './permissions-master.component.html',
  styleUrl: './permissions-master.component.css',
})
export class PermissionsMasterComponent {
  roles: any[] = [];
  menuList: any[] = [];
  selectedRole: Role | null = null;
  selectedModule: Module | null = null;
  @Output() permissionSelected = new EventEmitter<void>();
  expandedMenus: { [key: number]: boolean } = {};
  expandedGroups: Set<number> = new Set(); // Track expanded groups by ID
  activeMenuId: number | null = null; // Track which menu item is active

  expandedGroupId: number | null = null; // Track which group is expanded
  constructor(
    private service: dbUserRoleService,
    private sharedservice: dbCommonService
  ) {}

  async ngOnInit() {
    await this.getrole();
  }

  async getrole() {
    let dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection('role', null, null, null);

    if (dataobj && dataobj['Data']) {
      this.roles = dataobj['Data'].map((item: any) => ({
        RoleName: item.NAME,
        RoleId:item.ID
      }));
    }
  }
  toggleSelection(item: any) {
    item.isSelect = !item.isSelect;
    console.log('Updated Selection:', this.menuList);
  }
  onRoleSelect(role: Role) {
    this.selectedRole = role;
    this.selectedModule = null;
    this.getRoleMenu();

  }
  async getRoleMenu() {
    const obj = {
      RoleId: this.selectedRole,
      Mode:"E"
    };
    const data: Record<string, any> | null | undefined = await this.service.GetRoleMenu(obj);
    //console.log(data, 'rolename');

    if (data && data['Data']) {
      this.menuList= JSON.parse(data['Data'][0].menu);//Property 'Data' does not exist on type 'Object'.ts(2339)
      console.log(this.menuList, 'rolename');
    } else {
      
    }
  }
  selectModule(module: Module) {
    this.selectedModule = module;
    this.permissionSelected.emit();
  }
  selectPermission(permission: any) {
    this.permissionSelected.emit(permission); // Emit the selected permission
  }


  onParentSelect(menuItem: any) {
    menuItem.children?.forEach((child: any) => {
      child.isSelect = menuItem.isSelect;
    });
  }

  onChildSelect(parent: any) {
    parent.isSelect = parent.children.every((child: any) => child.isSelect);
  }

  isExpanded(menuId: number): boolean {
    return this.expandedMenus[menuId] || false;
  }
  toggleExpand(menuId: number): void {
    this.expandedMenus[menuId] = !this.expandedMenus[menuId];
  }
  toggleChild(parentId: number): void {
    const parent = this.menuList.find(menu => menu.id === parentId);
    
    this.expandedMenus[parentId] = parent?.children?.some((child: { isEdit: boolean; isView: boolean; isAdd: boolean }) => 
      child.isEdit || child.isView || child.isAdd
    ) || false;
  
    // Auto-collapse if no child is selected
    if (!this.expandedMenus[parentId]) {
      setTimeout(() => (this.expandedMenus[parentId] = false), 300);
    }
  }
  
  toggleParent(menu: any) {
    console.log('Parent updated:', menu);
  }
  toggleSelectAll(selectAll: boolean) {
    this.menuList.forEach((item) => {
      item.isSelect = selectAll;
      item.isAdd = selectAll;
      item.isEdit = selectAll;
      item.isView = selectAll;

      if (item.type === 'group' && item.children) {
        item.children.forEach((child: { isEdit: boolean; isView: boolean; isAdd: boolean,isSelect: boolean }) => {
          child.isSelect = selectAll;
          child.isAdd = selectAll;
          child.isEdit = selectAll;
          child.isView = selectAll;
        });
      }
    });
  }

  /** Select/Deselect a group and its children */
  toggleGroupSelect(group: any) {
    group.children.forEach((child: any) => {
      child.isSelect = group.isSelect;
      child.isAdd = group.isSelect;
      child.isEdit = group.isSelect;
      child.isView = group.isSelect;
    });
  }
 
  toggleGroup(groupId: number) {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
    this.activeMenuId = groupId;
  }

  isGroupExpanded(groupId: number): boolean {
    return this.expandedGroups.has(groupId);
  }
  selectMenuItem(menuId: number) {
    this.activeMenuId = menuId;
  }
}
