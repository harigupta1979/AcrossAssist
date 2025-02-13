import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { dbUserRoleService } from '../../service/user-role.service';
import { MaterialModule } from '../../../shared/material.module';
import { dbRoleMenuMappingService } from '../../../Services/rolemenumapping.service';

@Component({
  selector: 'app-user-master',
  imports: [MaterialModule],
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.css',
})
export class UserMasterComponent {
  displayedColumns: string[] = [
    'name',
    'role',
    'reportingPerson',
    'contactNumber',
    'email',
    'createdDate',
    'Status',
    'action',
  ];

  dataSource = new MatTableDataSource<any>([]);
  resultCount: number = 0;
  dataLength: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbUserService: dbRoleMenuMappingService) {}

  async ngOnInit() {
    await this.getUser();
  }
  async getUser() {
    let dataobj: Record<string, any> | null | undefined =
      await this.dbUserService.GetServiceUser({});

    if (dataobj && dataobj['Data']) {
      this.dataSource = dataobj['Data'].map((item: any) => ({
        UserName: `${item.FirstName} ${item.LastName}`,
        EmailAddress: item.EmailAddress,
        Role: item.RoleName,
        ReportingPersonName: item.ReportingPersonName,
        ContactNo: item.ContactNo,
        createdDate: item.CreatedAt || 'N/A',
        Status: item.IsActive ? 'Active' : 'Inactive',
      }));
    }
  }
}
