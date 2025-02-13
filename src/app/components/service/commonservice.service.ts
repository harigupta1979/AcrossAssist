import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class dbCommonService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    }),
  };

  // Function to retrieve token (can be from AuthService or similar)
  private getToken(): string {
    return localStorage.getItem('JwtToken') || ''; // Retrieve the token from storage
  }

  async GetSelection(
    Condition: string | null,
    FilterId3: string | null,
    FilterId: number | null,
    FilterId2: number | null
  ) {
    const seletctionModel2 = {
      Condition: Condition,
      FilterId: FilterId,
      FilterId2: FilterId2,
      FilterId3: FilterId3,
    };
    var body = JSON.stringify(seletctionModel2);
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
  async GetSelectionDetailsByLocation(FilterId: any) {
    const seletctionModel = {
      StateId: FilterId,
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
}
