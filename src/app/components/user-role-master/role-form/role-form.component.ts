import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dbRoleMenuMappingService } from '../../../Services/rolemenumapping.service';
import { MaterialModule } from '../../../shared/material.module';
import { dbCommonService } from '../../service/commonservice.service';
import { Module, Role } from '../user-master/role.model';
import { ToastService } from '../../../Services/toast.service';
import { dbUserRoleService } from '../../service/user-role.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

interface RoleResponse {
  FinalMode: string | null;
  Message: string | null;
}
@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css',
})
export class RoleFormComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('closeButton') closeButton!: ElementRef;
  roleForm!: FormGroup;
  selectedModule: Module | null = null;
  selectedRole: Role | null = null;
  roles: any[] = [];
  pagemode: string = 'Add';
  reportingRoles: any[] = [];
  submitted = false;
  selectedArray: any = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastService,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbService: dbRoleMenuMappingService,
    private sharedservice: dbCommonService
  ) {}
  ngOnInit(): void {
    this.roleFrom();
    this.getrole();
    if (this.data.role.RoleId != null) {
      this.pagemode = this.data.pageMode;
      for (let i in this.roleForm.controls) {
        this.roleForm.controls[i].setValue(this.data.role[i]);
      }
      if (this.pagemode === 'View') {
        this.roleForm.disable(); // This will make all form fields readonly
      }
    }
    console.log(this.roleForm);
  }
  roleFrom() {
    this.roleForm = this.fb.group({
      RoleId: [null],
      RoleName: ['', Validators.required],
      RoleParentId: [null],
      RoleDesc: ['', Validators.maxLength(500)],
      IsActive: [true, Validators.required],
      CreatedBy: [localStorage.getItem('UserId')],
      UpdatedBy: [localStorage.getItem('UserId')],
    });
  }
  closeDialog(result: boolean): void {
    this.dialogRef.close({ success: result });
  }
  async getrole() {
    let dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection('reportingrole',null, this.roleForm.controls['RoleId'].value,  null);

    if (dataobj && dataobj['Data']) {
      this.reportingRoles = dataobj['Data'];
    }
    console.log(this.reportingRoles, 'reportingRoles');
  }

  onRoleSelect(role: Role) {
    this.selectedRole = role;
    this.selectedModule = null;
    // this.getRoleMenu();
    console.log(role, 'rolename');
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.roleForm.invalid) {
      alert('Form is invalid!');
      return;
    }
    try {
      const response = (await this.dbService.PostService(
        this.roleForm.value
      )) as RoleResponse;

      if (
        response &&
        (response.FinalMode === 'INSERT' || response.FinalMode === 'UPDATE')
      ) {
        this.toastr.showSuccess(
          response.Message || 'Role saved successfully!',
          'Role'
        );
        // await this.addNew();
        this.closeDialog(true);
      } else {
        this.toastr.showError(
          response?.Message || 'Error saving role!',
          'Role'
        );
      }
    } catch (error) {
      console.error('Error during onSubmit:', error);
      this.toastr.showError('An error occurred while saving the role.', 'Role');
    }
  }
}
