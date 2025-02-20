import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class dbRoleMenuMappingService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    }),
  };
  private getToken(): string {
    return localStorage.getItem('JwtToken') || ''; // Retrieve the token from storage
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
  async GetService(obj: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'Role/GetRole', body, this.httpOptions)
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
  async GetServiceUser(obj: any) {
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'user/GetUser', body, this.httpOptions)
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
  async PostServiceUser(obj: any) {
    obj.RoleId = obj.RoleId == null ? null : obj.RoleId.toString();
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };

    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'User/PostUser', body, this.httpOptions)
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
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD');
    };
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'Role/GetRoleMenu', body, this.httpOptions)
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
