import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorFormComponent } from '../vendor-form/vendor-form.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { dbCommonService } from '../../service/commonservice.service';
import { dbVendorService } from '../../service/vendorservice.service';

@Component({
  selector: 'app-vendor-list',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css',
})
export class VendorListComponent {
  displayedColumns: string[] = [
    'AccountName',
    'BankName',
    'MobileNo',
    'EmailId',
    'StateName',
    'CityName',
    'PinCode',
    'action',
  ];
  dataSource: any[] = [];
  dataLength = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private sharedservice: dbVendorService
  ) {}
  async ngOnInit() {
    await this.getVendorList();
    // this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    // this.dataSource.filter = filterValue;
  }
  async getVendorList() {
    const obj = {
      RoleName: null,
    };
    const data: Record<string, any> | null | undefined =
      await this.sharedservice.GetVendorList(obj);

    if (data && data['Data']) {
      this.dataSource = data['Data'];
    } else {
      this.dataLength = false;
    }
  }

  openUserForm(): void {
    this.dialog
      .open(VendorFormComponent, {
        width: '500px',
        maxHeight: '90vh',
        disableClose: true,
        data: {},
        position: {
          right: '0px',
          top: '50px',
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((result: { success: boolean }) => {
        if (result && result.success) {
          console.log('User added successfully:', result);
        }
      });
  }
}
