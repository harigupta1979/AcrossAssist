import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../shared/material.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../Services/crypto.service';
import { SharedserviceService } from '../../Services/sharedservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MaterialModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private crypto: CryptoService,
    public sharedService: SharedserviceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  async login() {
    this.isSubmitting = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginForm = {
      username: this.loginForm.controls['username'].value,
      password: this.crypto.encrypt(this.loginForm.controls['password'].value),
    };
    console.log(loginForm, 'pallavi.kadam@quantique.ai');
    let dt: any = await this.auth.CheckUserLogin(loginForm);

    if (dt != null && dt['FinalMode'] == 'DataFound' && dt['Message'] != '') {
      if (!dt['Data'][0].IS_PWD_CHANGE && dt['Data'][0].AgreementCount <= 0) {
        this.loginForm.reset();
        this.isSubmitting = false;
      } else {
        this.router.navigateByUrl('/resetpassword?u=' + loginForm.username);
      }
      return;
    }

    localStorage.setItem('Dynemicmenu', '');
    let data: any = await this.auth.GetLogin(loginForm);
    if (
      data != null &&
      data['FinalMode'] == 'DataFound' &&
      data['AdditionalParameter'] != ''
    ) {
      var logindata = data['Data'][0];
      localStorage.setItem('UserId', logindata['USER_ID']);
      localStorage.setItem('UserName', logindata['USER_NAME']);
      localStorage.setItem(
        'Name',
        JSON.stringify(
          logindata['USER_FIRST_NAME'] + ' ' + logindata['USER_LAST_NAME']
        )
      );
      localStorage.setItem('IsAdmin', logindata['IS_ADMIN']);
      localStorage.setItem('UserType', logindata['USER_TYPE']);
      localStorage.setItem('DealerId', logindata['DEALER_ID']);
      localStorage.setItem('JwtToken', data['AdditionalParameter']);
      localStorage.setItem('sidenavCollapsed', 'true');
      var obj = {
        ActivityId: 0,
        UserId: localStorage.getItem('UserId'),
        UpdatedBy: localStorage.getItem('UserId'),
        LoginBrowser: this.detectBrowserName(),
        LoginBrowserVersion: this.detectBrowserVersion(),
        Action: 'insert',
      };
      let result: any = await this.auth.GetUserActivityLog(obj);
      var ActivityData = null;
      if (result != null && result['FinalMode'] == 'DataFound') {
        ActivityData = result['Data'][0];
        localStorage.setItem(
          'LOGIN_DATETIME',
          ActivityData == null ? '' : ActivityData['LOGIN_DATETIME']
        );
      } else {
        localStorage.setItem('LOGIN_DATETIME', new Date().toString());
      }

      //await this.menu.resetUserProfile();
      var Lastloggedon =
        ActivityData == null
          ? new Date().toLocaleString()
          : new Date(ActivityData['LOGIN_DATETIME']).toLocaleString();
      const CstuserProfile = {
        name: localStorage.getItem('Name')?.replace(/"/g, '') ?? '',
        email: null,
        id: logindata['USER_ID'],
        lastlogindatetime: 'Last logged on ' + Lastloggedon,
        avatar: './assets/images/avatar.jpg',
      };
      //this.userprofile.push(CstuserProfile);
      //await this.menu.setUserProfile(this.userprofile);
      await this.Getdynemicmenu();
      this.router.navigate(['/dashboard']);
    } else {
      localStorage.setItem('UserName', '');
      alert('error while login,Please check!');
      //this.toastr.error("error while login,Please check!", 'Login');
    }
    this.isSubmitting = false;
  }
  detectBrowserVersion() {
    var userAgent = navigator.userAgent,
      tem,
      matchTest =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];

    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }

    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    matchTest = matchTest[2]
      ? [matchTest[1], matchTest[2]]
      : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = userAgent.match(/version\/(\d+)/i)) != null)
      matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }
  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  async Getdynemicmenu() {
    let logindata = '';
    let data: any = await this.sharedService.GetDynemicmenu(
      localStorage.getItem('IsAdmin') ?? '',
      Number(localStorage.getItem('UserId'))
    );
    if (data != null) {
      if (
        data['FinalMode'] == 'DataFound' &&
        JSON.parse(data['Data'][0].menu) != null
      ) {
        localStorage.setItem(
          'Dynemicmenu',
          JSON.stringify(JSON.parse(data['Data'][0].menu))
        );
      } else {
        localStorage.setItem('Dynemicmenu', logindata);
      }
    } else {
      localStorage.setItem('Dynemicmenu', logindata);
    }
    //await this.menu.reset();

    //await this.menu.set(localStorage.getItem('Dynemicmenu') == '' ? '' : JSON.parse(localStorage.getItem('Dynemicmenu')));
  }
}
