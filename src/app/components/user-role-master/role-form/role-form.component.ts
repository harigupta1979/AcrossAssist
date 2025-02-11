import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dbRoleMenuMappingService } from '../../../Services/rolemenumapping.service';
import { MaterialModule } from '../../../shared/material.module';
import { dbCommonService } from '../../service/commonservice.service';
import { Module, Role } from '../user-master/role.model';
import { ToastService } from '../../../Services/toast.service';
import { dbUserRoleService } from '../../service/user-role.service';

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
  @ViewChild('closeButton') closeButton!: ElementRef; // Close button reference
  roleForm!: FormGroup;
  selectedModule: Module | null = null;
  selectedRole: Role | null = null;
  roles: any[] = [];
  reportingRoles: any[] = [];
  submitted = false;
  selectedArray: any = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastService,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbService: dbUserRoleService,
    private sharedservice: dbCommonService
  ) {}
  ngOnInit(): void {
    this.roleFrom();
    this.getrole();
  }
  roleFrom() {
    this.roleForm = this.fb.group({
      RoleId: [null],
      RoleName: ['', Validators.required],
      reportingRole: ['', Validators.required],
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
      await this.sharedservice.GetSelection('role', null, null, null);

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
    debugger;
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
        this.toastr.success(
          response.Message || 'Role saved successfully!',
          'Role'
        );
        // await this.addNew();
        this.closeDialog(true);
      } else {
        this.toastr.error(response?.Message || 'Error saving role!', 'Role');
      }
    } catch (error) {
      console.error('Error during onSubmit:', error);
      this.toastr.error('An error occurred while saving the role.', 'Role');
    }

    // this.sharedservice.spinner(false);
  }
}
