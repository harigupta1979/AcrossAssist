import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import moment from 'moment';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })

export class dbUserRoleService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'

        })
    }

     
  // Function to retrieve token (can be from AuthService or similar)
  private getToken(): string {
    console.log(localStorage.getItem('JwtToken'),'JwtToken')
    return localStorage.getItem('JwtToken') || ''; // Retrieve the token from storage
  }
  
async GetRoleList(obj: any) {
    Date.prototype.toISOString = function () {
        return moment(this).format("YYYY-MM-DD");
    }
    var body = JSON.stringify(obj);
    return await this.http.post(environment.apibaseUrl + "role/GetRole", body, this.httpOptions).toPromise
        ().then(
            res => {
                return res;
            },
            msg => {
                return null;
            }
        );
}


}