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
  activeMenuId: number | null = null; // Track which menu item is active
  CreatedBy: number | null = null;
  UpdatedBy: number | null = null;
  expandedGroupId: number | null = null; // Track which group is expanded
  constructor(
    private service: dbUserRoleService,
    private sharedservice: dbCommonService
  ) {}

  async ngOnInit() {
    await this.getrole();
  }
  onaddnew() {
    this.activeMenuId = null;
    this.expandedGroupId = null;
  }
  onPageLoad(): void {
    this.CreatedBy = Number(localStorage.getItem('UserId'));
    this.UpdatedBy = Number(localStorage.getItem('UserId'));
  }
  async getrole() {
    let dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection('role', null, null, null);

    if (dataobj && dataobj['Data']) {
      this.roles = dataobj['Data'].map((item: any) => ({
        RoleName: item.NAME,
        RoleId: item.ID,
      }));
    }
  }

  onRoleSelect(role: Role) {
    this.selectedRole = role;
    this.selectedModule = null;
    this.getRoleMenu();
    console.log(role, 'rolename');
  }
  async getRoleMenu() {
    this.onaddnew();
    const obj = {
      RoleId: this.selectedRole,
      Mode: 'E',
    };
    const data: Record<string, any> | null | undefined =
      await this.service.GetRoleMenu(obj);
    //console.log(data, 'rolename');

    if (data && data['Data']) {
      this.menuList = JSON.parse(data['Data'][0].menu); //Property 'Data' does not exist on type 'Object'.ts(2339)
      console.log(this.menuList, 'rolename');
    } else {
    }
  }

  toggleSelectAll(selectAll: boolean) {
    this.menuList.forEach((item) => {
      item.isSelect = selectAll;
      item.isAdd = selectAll;
      item.isEdit = selectAll;
      item.isView = selectAll;

      if (item.type === 'group' && item.children) {
        item.children.forEach(
          (child: {
            isEdit: boolean;
            isView: boolean;
            isAdd: boolean;
            isSelect: boolean;
          }) => {
            child.isSelect = selectAll;
            child.isAdd = selectAll;
            child.isEdit = selectAll;
            child.isView = selectAll;
          }
        );
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
    group.isSelect = group.isSelect;
    group.isAdd = group.isSelect;
    group.isEdit = group.isSelect;
    group.isView = group.isSelect;
  }

  toggleitemSelect(item: any) {
    item.isSelect = item.isSelect;
    item.isAdd = item.isSelect;
    item.isEdit = item.isSelect;
    item.isView = item.isSelect;
    const parentGroup = this.menuList.find(
      (group) =>
        group.type === 'group' &&
        group.children?.some((child: { id: any }) => child.id === item.id)
    );

    if (parentGroup) {
      // If any child is selected, select the parent group
      parentGroup.isSelect = parentGroup.children.some(
        (child: { isSelect: any }) => child.isSelect
      );
    }
  }
  toggleGroup(groupId: number) {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
    this.activeMenuId = groupId;
  }

  selectMenuItem(menuId: number) {
    this.activeMenuId = menuId;
  }

  extractSelectedMenus() {
    let selectedMenus: any[] = [];

    function traverse(menu: any) {
      if (menu.isSelect === 1 || menu.isSelect) {
        selectedMenus.push({
          MenuId: menu.id,
          IsAdd: menu.isAdd ? 1 : 0,
          IsEdit: menu.isEdit ? 1 : 0,
          IsView: menu.isView ? 1 : 0,
        });
      }

      if (menu.children && menu.children.length) {
        menu.children.forEach(traverse);
      }
    }

    // Loop through the main menu list
    for (const menu of this.menuList) {
      traverse(menu);
    }

    console.log(selectedMenus);
    return selectedMenus;
  }

  async savePermissions() {
    const selectedMenus = await this.extractSelectedMenus();
    const obj = {
      RoleId: this.selectedRole,
      CreatedBy: this.CreatedBy,
      UpdatedBy: this.UpdatedBy,
      MenuId: JSON.stringify(selectedMenus),
    };
    let data: any = await this.service.PostRoleMenuMappinging(obj);
    if (data['FinalMode'] == 'DUPLICATE') {
      // this.toastr.warning(data['Message'] , ' ',{
      //   disableTimeOut: true,
      //   tapToDismiss: false,
      //   toastClass: "toast border-yellow",
      //   closeButton:true,
      //   positionClass:'top-center',
      // });
      alert(data['Message']);
      //this.getRoleMenu();
    } else if (
      (data['FinalMode'] == 'INSERT' || data['FinalMode'] == 'UPDATE') &&
      data['Message'] != null
    ) {
      // this.toastr.success(data['Message'] , ' ',{
      //   disableTimeOut: true,
      //   tapToDismiss: false,
      //   toastClass: "toast border-green",
      //   closeButton:true,
      //   positionClass:'top-center',
      // });
      alert(data['Message']);
      this.getRoleMenu();
    }

    console.log(this.menuList, 'menulistonsave');
    console.log(selectedMenus, 'selected menus on save');
  }
}
