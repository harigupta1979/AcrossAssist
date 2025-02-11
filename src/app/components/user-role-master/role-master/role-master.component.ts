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
    'RoleDesc',
    'createdDate',
    'status',
    'action',
  ];
  async getrole() {
    let dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection('role', null, null, null);

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
    const data: Record<string, any> | null | undefined = await this.service.GetRoleList(obj);
    //console.log(data, 'rolename');

    if (data && data['Data']) {
      this.dataSource=data['Data'];//Property 'Data' does not exist on type 'Object'.ts(2339)
      console.log(this.dataSource, 'rolename');
    } else {
      this.dataLength = false;
    }
  }
}
