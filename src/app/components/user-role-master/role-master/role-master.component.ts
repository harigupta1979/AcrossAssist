import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { dbUserRoleService } from '../../service/user-role.service';
import { dbCommonService } from '../../service/commonservice.service';

@Component({
  selector: 'app-role-master',
  imports: [MaterialModule],
  templateUrl: './role-master.component.html',
  styleUrl: './role-master.component.css',
})
export class RoleMasterComponent {
  constructor(
    private service: dbUserRoleService,
    private sharedservice: dbCommonService
  ) {}

  async ngOnInit() {
    await this.getrole();
    await this.getrollist();
  }
  campaignList: any[] = [];
  list: any[] = [];
  dataLength = true;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'RoleName',
    'permission',
    'createdDate',
    'status',
    'action',
  ];
  async getrole() {
    let dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection('role', '', 0, 0);

    if (dataobj && dataobj['Data']) {
      this.dataSource = dataobj['Data'].map((item: any) => ({
        RoleName: item.NAME,
        permission: '',
        createdDate: new Date(),
        status: 'Active',
      }));
    }
  }

  async getrollist() {
    const obj = {
      RoleName: null,
    };
    const data = await this.service.GetRoleList(obj);
    console.log(obj, 'rolename');

    if (data != null) {
    } else {
      this.dataLength = false;
    }
  }
}
