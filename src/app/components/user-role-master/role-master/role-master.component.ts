import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { dbUserRoleService } from '../../service/user-role.service';
import { dbCommonService } from '../../service/commonservice.service';
import { MatButtonModule } from '@angular/material/button';
import moment from 'moment';

@Component({
  selector: 'app-role-master',
  imports: [MaterialModule, MatButtonModule],
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

    console.log('API Response:', dataobj);
    if (dataobj && dataobj['Data']) {
      this.dataSource = dataobj['Data'].map((item: any) => {
        let parsedDate = item.CREATED_DATE ? new Date(item.CREATED_DATE) : null;
        // console.log('Raw Date from API:', item.CREATED_DATE);
        // console.log('Parsed Date:', parsedDate);
        return {
          RoleName: item.NAME,
          RoleDesc: item.DESCRIPTION,
          createdDate: parsedDate,
          IsActive: item.IS_ACTIVE ? 'Active' : 'Inactive',
        };
      });
    }
  }

  async getrollist() {
    const obj = {
      RoleName: null,
    };
    const data: Record<string, any> | null | undefined =
      await this.service.GetRoleList(obj);

    if (data && data['Data']) {
      this.dataSource = data['Data'];
    } else {
      this.dataLength = false;
    }
  }
}
