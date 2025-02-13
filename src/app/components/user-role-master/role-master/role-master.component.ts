import { Component } from '@angular/core';
import { dbUserRoleService } from '../../service/user-role.service';
import { dbCommonService } from '../../service/commonservice.service';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { RoleFormComponent } from '../role-form/role-form.component';
import { EventEmitterService } from '../../service/eventemitter.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-role-master',
  imports: [MaterialModule, MatButtonModule],
  templateUrl: './role-master.component.html',
  styleUrl: './role-master.component.css',
})
export class RoleMasterComponent {
  private subscription!: Subscription;

  constructor(
    private service: dbUserRoleService,
    private eventEmitterService: EventEmitterService,
    private sharedservice: dbCommonService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getrole();
    await this.getrollist();
    this.subscription = this.eventEmitterService.refreshList$.subscribe(() => {
      this.getrollist();
    });
  }
  campaignList: any[] = [];
  list: any[] = [];
  dataLength = true;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'RoleName',
    'RoleDesc',
    'ReportingRole',
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
        let parsedDate = item.CreatedAt ? new Date(item.CreatedAt) : null;
        // console.log('Raw Date from API:', item.CREATED_DATE);
        // console.log('Parsed Date:', parsedDate);
        return {
          RoleName: item.RoleName,
          RoleDesc: item.DESCRIPTION,
          createdDate: item.CreatedAt,
          IsActive: item.IS_ACTIVE ? 'Active' : 'Inactive',
        };
      });
    }
  }
  editRole(role: any) {
    console.log('Editing Role:', role);
    this.dialog
      .open(RoleFormComponent, {
        width: '500px',
        disableClose: true,
        data: { role },
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
        this.getrollist();
      });

    // Your logic to edit the role
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
