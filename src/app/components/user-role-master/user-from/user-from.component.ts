import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
  output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleFormComponent } from '../role-form/role-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedserviceService } from '../../../Services/sharedservice.service';
import { dbCommonService } from '../../service/commonservice.service';
import { ToastService } from '../../../Services/toast.service';
import { AuthService } from '../../../Services/auth.service';
import { dbRoleMenuMappingService } from '../../../Services/rolemenumapping.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Role } from '../permission.model';

interface ApiResponse {
  FinalMode: string | null;
  Data: any[];
  Message: string | null;
}

@Component({
  selector: 'app-user-from',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-from.component.html',
  styleUrl: './user-from.component.css',
})
export class UserFromComponent  implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();
  @ViewChild('closeButton') closeButton!: ElementRef; // Close button reference
  userForm!: FormGroup;
  submitted = false;
  CityId: any;
  postaldata: any;
  countryList: any;
  stateList: any;
  PostalCodeList: any;
  cityList: any;
  roleParentId: number | null = null;
  RoleParentId: any[] = [];
  userRoles: any[] = [];
  reportingRoles: any[] = [];
  pagemode: string = 'Add';
  maxDate = new Date();
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedService: SharedserviceService,
    private sharedRoleService: dbCommonService,
    private toastService: ToastService,
    private authService: dbRoleMenuMappingService
  ) {}
  async ngOnInit(): Promise<void> {
    this.userFormBuild();
    await this.getrole();
    await this.getReportingRole();
    await this.getcountry();
    await this.getLocationPincode();
    await this.userListEdit();
  }

  userFormBuild() {
    this.userForm = this.fb.group({
      UserId: [null],
      UserType: [null],
      UserName: [],
      Password: [],
      DecptPassword: [],
      FirstName: ['', [Validators.required, Validators.minLength(2)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      ContactNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      EmailAddress: ['', [Validators.required, Validators.email]],
      DOB: ['', Validators.required],
      PinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      CityId: ['', Validators.required],
      StateId: ['', Validators.required],
      CountryId: [null],
      CityName: [null],
      CountryName: [''], // ✅ Add This
      StateName: [''], // ✅ Add This
      RoleId: [null],
      ReportingPersonId: [null],
      IsActive: [true],
      CreatedBy: [null],
      UpdatedBy: [null],
    });
  }

  get f() {
    return this.userForm.controls;
  }
  async userListEdit() {
    if (this.data.user.UserId) {
      this.pagemode = 'Edit';
      Object.keys(this.userForm.controls).forEach((key) => {
        let value = this.data.user[key];

        if (key === 'DOB' && value) {
          let [day, month, year] = value.split('/');
          value = new Date(`${year}-${month}-${day}`);
        }
        this.userForm.controls[key].setValue(value);
      });
    }
  }

  async getrole() {
    let dataobj: Record<string, any> | null | undefined =
      await this.sharedRoleService.GetSelection('role', null, null, null);

    if (dataobj && dataobj['Data']) {
      this.userRoles = dataobj['Data'];
    }
  }
  async getReportingRole() {
    const dataobj: Record<string, any> | null | undefined =
      await this.sharedRoleService.GetSelection(
        'reportingmanager',
        null,
        this.roleParentId,
        null
      );

    if (dataobj && dataobj['Data']) {
      this.reportingRoles = dataobj['Data'];
    } else {
      this.reportingRoles = [];
    }
  }
  onselectUserRole(role: any) {
    if (!role || role.RoleParentId === undefined) {
      this.toastService.showError('Invalid role selected!');
      return;
    }
    this.roleParentId = role.RoleParentId;
    if (this.userForm && this.userForm.controls['UserType']) {
      this.userForm.controls['UserType'].setValue(role.NAME || null);
    } else {
      this.toastService.showError(
        'UserType control does not exist in the form!'
      );
    }

    this.getReportingRole();
  }
  async getLocationPincode() {
    this.userForm.controls['PinCode'].valueChanges.subscribe(
      async (pinCode) => {
        if (pinCode && pinCode.length === 6) {
          await this.GetLocationByPinCode();
        }
      }
    );
    if (this.userForm.controls['PinCode'].value) {
      await this.GetLocationByPinCode();
    }
    this.userForm.controls['CountryId'].valueChanges.subscribe(
      async (countryId) => {
        if (countryId) {
          await this.getstate(countryId);
        }
      }
    );

    this.userForm.controls['StateId'].valueChanges.subscribe(
      async (stateId) => {
        if (stateId) {
          await this.getcity(stateId);
        }
      }
    );
  }
  async GetLocationByPinCode() {
    let pinCode = this.userForm.controls['PinCode'].value;
    if (!pinCode || pinCode.length !== 6) return;

    let data = await this.sharedService.GetSelectionDetailsByLocation(pinCode);
    if (data && (data as ApiResponse).FinalMode === 'DataFound') {
      let PincodeData = (data as ApiResponse).Data;
      if (!PincodeData || PincodeData.length === 0) {
        return;
      }
      this.userForm.controls['CountryId'].setValue(
        PincodeData[0]['CountryId'] || null
      );
      this.userForm.controls['StateId'].setValue(
        PincodeData[0]['StateId'] || null
      );
      this.userForm.controls['CityId'].setValue(
        PincodeData[0]['CityId'] || null
      );
      this.userForm.controls['StateName']?.setValue(
        PincodeData[0]['StateName'] || ''
      );
      this.userForm.controls['CityName']?.setValue(
        PincodeData[0]['CityName'] || ''
      );
      await this.getstate(PincodeData[0]['CountryId']);
      await this.getcity(PincodeData[0]['StateId']);
      this.cityList = [...PincodeData];
      this.stateList = [
        { ID: PincodeData[0]['StateId'], NAME: PincodeData[0]['StateName'] },
      ];
    }
  }

  findUnique<T>(arr: T[], predicate: (item: T) => string | number): T[] {
    const found: Record<string | number, T> = {};
    arr.forEach((d) => {
      found[predicate(d)] = d;
    });
    let uniqueCities = Object.values(found);
    return uniqueCities;
  }

  async getcountry() {
    let data = await this.sharedService.GetSelectionDetails(
      'country',
      null,
      0,
      null,
      null
    );
    if (data != null && (data as ApiResponse).FinalMode == 'DataFound') {
      this.countryList = (data as ApiResponse).Data;
    }
  }
  async getstate(countryId: number) {
    let data = await this.sharedService.GetSelectionDetails(
      'state',
      null,
      countryId,
      null,
      null
    );
    if (data != null && (data as ApiResponse).FinalMode == 'DataFound') {
      this.stateList = (data as ApiResponse).Data;
    }
  }
  async getcity(stateId: number) {
    let data = await this.sharedService.GetSelectionDetails(
      'city',
      null,
      stateId,
      null,
      null
    );
    if (data != null && (data as ApiResponse).FinalMode == 'DataFound') {
      this.cityList = (data as ApiResponse).Data;
    }
  }
  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.toastService.showWarning(
        'Form is invalid! Please check all fields.',
        'Warning'
      );
      return;
    }
    const formData = {
      CountryId: this.userForm.value.CountryId,
      StateId: this.userForm.value.StateId,
      CityId: this.userForm.value.CityId,
      UserId: this.userForm.value.UserId || 0,
      RoleId: this.userForm.value.RoleId || 0,
      FirstName: this.userForm.value.FirstName,
      LastName: this.userForm.value.LastName,
      EmailAddress: this.userForm.value.EmailAddress,
      Password: this.userForm.value.Password,
      Address: '',
      PinCode: this.userForm.value.PinCode,
      ContactNo: this.userForm.value.ContactNo,
      DOB: this.userForm.value.DOB,
      UserType: this.userForm.value.UserType,
      IsActive: this.userForm.value.IsActive,
      CreatedBy: 1,
      UpdatedBy: 1,
      ReportingPersonId: this.userForm.value.ReportingPersonId,
    };
    try {
      const response = (await this.authService.PostServiceUser(
        formData
      )) as ApiResponse;

      if (
        response &&
        (response.FinalMode === 'INSERT' || response.FinalMode === 'UPDATE')
      ) {
        this.toastService.showSuccess(
          response.Message || 'User added successfully!',
          'User'
        );
        setTimeout(() => {
          this.closeDialog(true);
        }, 1000);
      } else {
        this.toastService.showError(
          response?.Message || 'Error saving user!',
          'User'
        );
      }
    } catch (error) {
      this.toastService.showError(
        'An error occurred while saving the user.',
        'User'
      );
    }
  }
  closeDialog(result: boolean): void {
    this.dialogRef.close({ success: result });
  }
  onclose() {
    this.dialogRef.close();
  }
}
