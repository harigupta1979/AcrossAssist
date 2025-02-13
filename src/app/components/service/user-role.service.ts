import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class dbUserRoleService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    }),
  };

  // Function to retrieve token (can be from AuthService or similar)
  private getToken(): string {
    console.log(localStorage.getItem('JwtToken'), 'JwtToken');
    return localStorage.getItem('JwtToken') || ''; // Retrieve the token from storage
  }

  async GetRoleList(obj: any) {
    Date.prototype.toISOString = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'role/GetRole', body, this.httpOptions)
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
  async GetRoleMenu(obj: any) {
    Date.prototype.toISOString = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'role/GetRoleMenu', body, this.httpOptions)
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
  async PostRoleMenuMappinging(obj: any) {
    Date.prototype.toISOString = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'role/PostRoleMenuMappinging',
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
  async PostService(obj: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'Role/PostRole', body, this.httpOptions)
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
  async GetSelectionDetails(
    // Condition: string,
    // BusinessPartnerId: number,
    FilterId: number,
    FilterId2: number,
    FilterId3: string | null,
    LoginUserId: number | null = null
  ) {
    const fromData = {
      // Condition: Condition,
      // BusinessPartnerId: BusinessPartnerId,
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
}
