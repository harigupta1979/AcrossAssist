import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../Services/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dbCommonService } from '../../service/commonservice.service';
import { dbVendorService } from '../../service/vendorservice.service';
import { Observable, ReplaySubject } from 'rxjs';
interface CityData {
  CityName: string;
  CityId: number;
  CountryId: number;
  CountryName: string;
  StateId: number;
  StateName: string;
}
@Component({
  selector: 'app-vendor-form',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vendor-form.component.html',
  styleUrl: './vendor-form.component.css',
})
export class VendorFormComponent implements OnInit {
  vendorForm!: FormGroup;
  pagemode: string = 'Add';
  cityList: any[] = [];
  accountTypeList: any[] = [];
  locationList: any[] = [];
  bankList: any[] = [];
  stateList: any[] = [];
  uploadedFiles: any[] = []; 
  documentTypes = [
    { ID: 1, NAME: 'PAN Card' },
    { ID: 2, NAME: 'GST Certificate' },
    { ID: 3, NAME: 'Aadhaar' }
  ];
  onboardID! :Number;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastService,

    public dialogRef: MatDialogRef<VendorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     private dbService: dbVendorService,
    private sharedservice: dbCommonService
  ) {}
  async ngOnInit(): Promise<void> {
    this.vendorFormBuild();
    this.getBanklist();
    this.getlocationlist();
    this.getaccounttypelist();
    if (this.data.role.OnBoardId != null) {
      this.pagemode = this.data.pageMode;
      for (let i in this.vendorForm.controls) {
        this.vendorForm.controls[i].setValue(this.data.role[i]);
      }
      if (this.pagemode === 'View') {
        this.vendorForm.disable();
      }
    }
  }

  vendorFormBuild() {
    this.vendorForm = this.fb.group({
      OnBoardId: [null],
      OnBoardName: [null, [Validators.required]],
      Address: [null, [Validators.required]],
      MobileNo: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      EmailId: [null, [Validators.required]],
      CountryId: [null, [Validators.required]],
      StateId: [null, [Validators.required]],
      CityId: [null, [Validators.required]],
      LocationId: [null, [Validators.required]],
      PinCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      MSMENumber: [null, [Validators.required]],
      GSTNumber: [null, [Validators.required]],
      PANNumber: [null, [Validators.required]],
      BankId: [null, [Validators.required]],
      CountryName: [null],
      StateName: [null],
      AccountTypeId: [null, [Validators.required]],
      AccountName: [null],
      AccountNo: [null],
      IFSCCode: [null],
      IsActive: [true],
      CreatedBy: [localStorage.getItem('UserId')],
      UpdatedBy: [localStorage.getItem('UserId')]
    });
  }

  get f() {
    return this.vendorForm.controls;
  }

  async GetLocationByPinCode() {
    if(this.vendorForm.controls['PinCode'].value.length<6){
      return;
    }
    let data: any = await this.sharedservice.GetSelectionDetailsByLocation(
      this.vendorForm.controls['PinCode'].value
    );
    if (data != null) {
      if (data.FinalMode == 'DataFound') {
        var PincodeData: CityData[] = data['Data'];
        this.vendorForm.controls['CountryId'].setValue(
          PincodeData[0]['CountryId']
        );
        this.vendorForm.controls['CountryName'].setValue(
          PincodeData[0]['CountryName']
        );
        this.vendorForm.controls['StateId'].setValue(PincodeData[0]['StateId']);
        this.vendorForm.controls['StateName'].setValue(
          PincodeData[0]['StateName']
        );
        var result = this.findUnique(PincodeData, (d) => d.CityName);
        this.cityList = result;
        if (result.length == 1) {
          this.vendorForm.controls['CityId'].setValue(PincodeData[0]['CityId']);
        }
      }
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
  async getBanklist() {
    const dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection(
        'bank',
        null,
        null,
        null
      );

    if (dataobj && dataobj['Data']) {
      this.bankList = dataobj['Data'];
    } else {
      this.bankList = [];
    }
  }
  async getlocationlist() {
    const dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection(
        'state',
        null,
        null,
        null
      );

    if (dataobj && dataobj['Data']) {
      this.locationList = dataobj['Data'];
    } else {
      this.locationList = [];
    }
  }
  async getaccounttypelist() {
    const dataobj: Record<string, any> | null | undefined =
      await this.sharedservice.GetSelection(
        'accounttype',
        null,
        null,
        null
      );

    if (dataobj && dataobj['Data']) {
      this.accountTypeList = dataobj['Data'];
    } else {
      this.accountTypeList = [];
    }
  }
 
  async onSubmit(): Promise<void> {
      if (this.vendorForm.invalid) {
      alert('Form is invalid!');
      return;
    }
    console.log(this.uploadedFiles);
    try {
      const response :any= await this.dbService.PostService(
        this.vendorForm.value
      );

      if (
        response &&
        (response.FinalMode === 'INSERT' || response.FinalMode === 'UPDATE')
      ) {
        this.onboardID=response.Recid;
        // this.toastr.showSuccess(
        //   response.Message || 'Vendor onbosrded successfully!',
        //   'Role'
        // );
        // await this.addNew();
       await this.uploadDocument();
        
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

  closeDialog(result: boolean): void {
    this.dialogRef.close({ success: result });
  }
  onclose() {
    this.dialogRef.close();
  }
  // Convert file to Base64
  async convertFile(file: File): Promise<Observable<string>> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (event) => {
      if (event.target && event.target.result) {
        await result.next(btoa(event.target.result.toString()));
      } else {
        console.error('Error: event.target or event.target.result is null.');
      }
    };
    return result;
  }
  // Handling document submission
  async uploadDocument(): Promise<void> {
    if (this.vendorForm.invalid) {
      alert('Form is invalid!');
      return;
    }
    
    try {
      const modifiedFiles = this.uploadedFiles.map(file => ({
        ...file,  // Spread the existing file object
        onboardID: this.onboardID  // Add onboardID
      }));
      const formData = new FormData();
      formData.append('multifile', JSON.stringify(modifiedFiles)); // Upload all files as JSON
      
      const response: any = await this.dbService.PostDocumentService(formData);
      if (response && (response.FinalMode === 'INSERT' || response.FinalMode === 'UPDATE')) {
        this.toastr.showSuccess(response.Message || 'Vendor onboarded successfully!');
        this.closeDialog(true);
      } else {
        this.toastr.showError(response?.Message || 'Error saving role!', 'Role');
      }
    } catch (error) {
      console.error('Error during onSubmit:', error);
      this.toastr.showError('An error occurred while saving the role.', 'Role');
    }
  }

  




  isDocumentTypeUploaded(docTypeId: number): boolean {
    console.log("uploadedFiles:", this.uploadedFiles);
    console.log("Checking for DocumentTypeId:", docTypeId);
    return this.uploadedFiles.some(f => f.DocumentTypeId === docTypeId);
  }

  // Get the filtered list of files for a particular DocumentTypeId
  getFilesForDocumentType(docTypeId: number) {
    return this.uploadedFiles.filter(f => f.DocumentTypeId === docTypeId);
  }

  // Method to handle file upload (you need to implement the actual logic)
  async onFilesChange(e: any, docTypeId: number) {
    // Your file upload handling logic here
    const files = e.target.files[0];
    var documentType = this.documentTypes.filter(x => x.ID ==docTypeId )[0].NAME;
  
     
      if (e.target.files && e.target.files[0]) {
        (await this.convertFile(files)).subscribe(async base64 => {
          
          this.uploadedFiles.push({ DocumentId:null,
            FileSize:`${files.size / 1024}KB`,
            FileName:files.name,
            FileExtension:files.name.substring(files.name.lastIndexOf('.') + 1),
            DocumentType:documentType,
            DocumentBas64:base64,
            DocumentTypeId:docTypeId});
        });
      }
     
  }

  deleteFile(docTypeId: number) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.DocumentTypeId !== docTypeId);
  }
}
