import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorFormComponent } from '../vendor-form/vendor-form.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-vendor-list',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent {
  constructor(

    private dialog: MatDialog
  ) {}
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
