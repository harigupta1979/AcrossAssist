import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  async GetLogin(obj: any) {
    var body = JSON.stringify(obj);
    return await this.http
      .post(environment.apibaseUrl + 'Login/GetLogin', body, this.httpOptions)
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }

  async CheckUserLogin(obj: any) {
    debugger;
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/CheckUserLogin',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }
  async GetResetPassword(obj: any) {
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/GetResetPassword',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }
  async GetUserActivityLog(obj: any) {
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/GetUserActivityLog',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }

  async GenerateLoginOTP(obj: any) {
    debugger;
    debugger;
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/GenerateUserOTP',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }

  async VerifyUserOTP(obj: any) {
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/VerifyUserOTP',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }
  async UpdateUserPassword(obj: any) {
    var body = JSON.stringify(obj);
    return await this.http
      .post(
        environment.apibaseUrl + 'Login/UpdateUserPassword',
        body,
        this.httpOptions
      )
      .toPromise()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          JSON.stringify(msg);
          return null;
        }
      );
  }
  getToken(): string | null {
    return localStorage.getItem('JwtToken'); // Fetch token from storage
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Check if token exists
  }
  // user: any;
  // token: any = '';

  // constructor(private router: Router) {}

  // loadStorage() {
  //   if (localStorage.getItem('token')) {
  //     this.token = localStorage.getItem('token');
  //     this.user = JSON.parse(localStorage.getItem('user') ?? '');
  //   } else {
  //     this.token = '';
  //     this.user = null;
  //   }
  // }

  // login(obj: any) {
  //   if (obj.username === 'admin@gmail.com' && obj.password === '12345') {
  //     const mockResponse = {
  //       status: 200,
  //       message: 'Login successful',
  //       data: {
  //         userId: 9,
  //         username: 'Abhishek Tripathi',
  //         access_token: 'your-token-here',
  //       },
  //     };
  //     return this.saveLocalStorageResponse(mockResponse.data);
  //   } else {
  //     return false;
  //   }
  // }

  // private saveLocalStorageResponse(resp: any) {
  //   if (resp.access_token && resp.userId) {
  //     localStorage.setItem('token', resp.access_token);
  //     localStorage.setItem('user', JSON.stringify(resp));
  //     this.user = resp;
  //     this.token = resp.access_token;
  //     return true;
  //   }
  //   return false;
  // }

  logout() {
    localStorage.removeItem('JwtToken');
    localStorage.removeItem('UserName');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
