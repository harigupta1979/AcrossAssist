import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  DropDowncommon,
  seletction,
  seletctionModel,
  seletctionModel2,
} from '../models/selectionCommon.model';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class SharedserviceService {
  private IpAddress: string = '';
  private seletctionModel!: seletctionModel;
  private seletctionModel2!: seletctionModel2;
  private seletction!: seletction;
  private _dropDownCommon!: DropDowncommon;
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private messageSource_back = new BehaviorSubject('');
  currentMessage_back = this.messageSource_back.asObservable();
  constructor(private router: Router, private http: HttpClient) {
    this.getIpAdrress();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  redirectTo(uri: any) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  async GetSelectionDetails(
    Condition: string,
    FilterId: number,
    FilterId2: number,
    FilterId3: string | null,
    LoginUserId: number | null = null
  ) {
    const fromData = {
      Condition: Condition,
      FilterId: FilterId,
      FilterId2: FilterId2,
      FilterId3: FilterId3,
      LoginUserId: LoginUserId,
    };
    var body = JSON.stringify(fromData);
    return await this.http
      .post(
        environment.apibaseUrl + 'DropdownSelection/GetSelection',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }

  async GetRoleBaseAccessControll(Condition: string, FilterId: number) {
    const fromData = {
      Condition: Condition,
      FilterId: FilterId,
    };
    var body = JSON.stringify(fromData);
    return await this.http
      .post(
        environment.apibaseUrl + 'DropdownSelection/GetRoleBaseAccessControl',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async GetdownloadReport(obj: any) {
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'Report/GetPDFReport', body, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
        observe: 'response', // simply add this option
      })
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async GetDynemicmenu(Condition: string, FilterId: number) {
    const fromData = {
      Condition: Condition,
      FilterId: FilterId,
    };
    var body = JSON.stringify(fromData);
    return await this.http
      .post(
        environment.apibaseUrl + 'DropdownSelection/GetDynemicmenu',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async GetSelectionDetailsByLocation(FilterId: any) {
    const seletctionModel = {
      PinCode: FilterId,
    };
    var body = JSON.stringify(seletctionModel);
    return await this.http
      .post(
        environment.apibaseUrl + 'DropdownSelection/GetLocationByPinCode',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async GetSelection(
    Condition: string,
    FilterId3: string,
    FilterId: number,
    FilterId2: number
  ) {
    this.seletctionModel2 = {
      Condition: Condition,
      FilterId: FilterId,
      FilterId2: FilterId2,
      FilterId3: FilterId3,
    };
    var body = JSON.stringify(this.seletctionModel2);
    return await this.http
      .post(
        environment.apibaseUrl + 'DropdownSelection/GetSelectionAutoCmt',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async GetUserInfo(obj: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/GetUserInfo',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async getIpAdrress() {
    const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    let data = await res.text();
    let ip = data.substring(data.indexOf('ip=') + 3, data.indexOf('ts='));
    this.IpAddress = ip;
  }
  async AcceptDealerAgreement(AgreementId: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };

    const obj = {
      AgreementId: AgreementId,
      IpAddress: this.IpAddress,
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Dealer/AcceptDealerAgreement',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }

  async GetAgreementFile(AgreementId: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    const obj = {
      AgreementId: AgreementId,
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Dealer/GetAgreementFile',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }

  async GetOtherAgreementDocuments(docType: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    const obj = {
      DocType: docType,
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Dealer/GetOtherAgreementDocuments',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }

  async DownloadAgreementDocuments(AgreementId: any, docType: string) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    const obj = {
      AgreementId: AgreementId,
      DocType: docType,
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Dealer/DownloadAgreementDocuments',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }
  async GetDropDownDetails(type: string, condition: string) {
    this._dropDownCommon = {
      Type: type,
      condition: condition,
    };
    var body = JSON.stringify(this._dropDownCommon);
    return await this.http
      .post(
        environment.apibaseUrl + 'DropdownSelection/GetDropDownDtl',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          return null;
        }
      );
  }

  sharingData(newData: any) {
    if (newData == null) {
      this.messageSource.isStopped = true;
    } else {
      this.messageSource.isStopped = false;
      this.messageSource.next(newData);
    }
  }

  sharingData_back(newData: any) {
    if (newData == null) {
      this.messageSource_back.isStopped = true;
    } else {
      this.messageSource_back.isStopped = false;
      this.messageSource_back.next(newData);
    }
  }

  OnlyNumber(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public decimalOnly(event: any) {
    let txt = event.target.value.trim();
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode == 46) {
      if (txt.includes('.') == false) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    }
    return true;
  }
  DefActiveDropdown = [
    {
      id: false,
      name: 'False',
    },
    {
      id: true,
      name: 'True',
    },
    {
      id: 'all',
      name: 'ALL',
    },
  ];

  DefEmailDropdown = [
    {
      id: false,
      name: 'False',
    },
    {
      id: true,
      name: 'True',
    },
    {
      id: null,
      name: 'ALL',
    },
  ];
}
