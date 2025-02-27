import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { dbUserRoleService } from '../../service/user-role.service';
import { MaterialModule } from '../../../shared/material.module';
import { dbRoleMenuMappingService } from '../../../Services/rolemenumapping.service';
import { EventEmitterService } from '../../service/eventemitter.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserFromComponent } from '../user-from/user-from.component';

@Component({
  selector: 'app-user-master',
  imports: [MaterialModule],
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.scss',
})
export class UserMasterComponent {
  private subscription!: Subscription;
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

  constructor(
    private dbUserService: dbRoleMenuMappingService,
    private eventEmitterService: EventEmitterService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getUser();
    this.subscription = this.eventEmitterService.refreshuserList$.subscribe(
      () => {
        this.getUser();
      }
    );
  }
  async getUser() {
    let dataobj: Record<string, any> | null | undefined =
      await this.dbUserService.GetServiceUser({});
    if (dataobj && dataobj['Data']) {
      this.dataSource = dataobj['Data'];
    } else {
      this.dataLength = false;
    }
  }
  editUser(user: any) {
    this.dialog
      .open(UserFromComponent, {
        width: '500px',
        maxHeight: '90vh',
        disableClose: true,
        data: { user },
        position: {
          right: '0px',
          top: '50px',
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((result: { success: boolean }) => {
        if (result && result.success) {
          console.log('USer added successfully:', result);
        }
        this.getUserlist();
      });
  }
  async getUserlist() {
    debugger;

    const userObj = {
      UserName: null,
    };
    const data: Record<string, any> | null | undefined =
      await this.dbUserService.GetServiceUser(userObj);
    if (data && data['Data']) {
      this.dataSource = data['Data'];
    } else {
      this.dataLength = false;
    }
  }
}
