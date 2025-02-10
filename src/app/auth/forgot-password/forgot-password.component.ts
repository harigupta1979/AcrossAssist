import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastService } from '../../Services/toast.service';
import { CryptoService } from '../../Services/crypto.service';
import { PasswordStrengthValidator } from '../../shared/Directives/password-strength-validator';
import { ConfirmPasswordValidator } from '../../shared/Directives/confirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  imports: [MaterialModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  isSubmitting = false;
  isShowtxtUsername = true;
  isShowtxtOtp = false;
  isShowtxtNewPwd = false;
  isShowtxtReEntPwd = false;
  isShowbtnGenerateOtp = true;
  isShowbtnVerifyOtp = false;
  isShowbtnBack = false;
  isOTPVerified = false;
  validOtp!: string;
  OTPID!: string;
  OTP_EXPIRE_TIME!: Date;
  forgetpwdForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastService,
    private crypto: CryptoService
  ) {}

  ngOnInit() {
    this.forgetpwdForm = this.fb.group(
      {
        Username: ['', [Validators.required]],
        Userotp: ['', [Validators.required]],
        Newpassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ]),
        ],
        Reenterpassword: ['', [Validators.required]],
        Passwordexpiredays: ['45', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('Newpassword', 'Reenterpassword'),
      }
    );
  }

  async generateOTP() {
    this.isSubmitting = true;
    this.isOTPVerified = false;
    const forgetpwdForm = {
      Username: this.forgetpwdForm.controls['Username'].value,
    };
    if (!forgetpwdForm.Username) {
      this.isSubmitting = false;
      return;
    }
    let dt: any = await this.auth.GenerateLoginOTP(forgetpwdForm);
    if (dt && dt['Message'] === 'Success') {
      this.toastr.success('OTP Send Successfully', 'Reset Password');
      this.isShowtxtOtp = true;
      this.isShowbtnGenerateOtp = false;
      this.isShowbtnVerifyOtp = true;
      this.isShowbtnBack = false;
      this.forgetpwdForm.controls['Username'].disable();
      this.forgetpwdForm.controls['Userotp'].setValue('');
      this.validOtp = dt['Data'][0].OTP;
      this.OTPID = dt['Data'][0].OTPID;
      this.OTP_EXPIRE_TIME = new Date(dt['Data'][0].OTP_EXPIRE_TIME);
    } else {
      this.toastr.error('Incorrect username, Please check!', 'Reset Password');
    }
    this.isSubmitting = false;
  }

  async verifyOTP() {
    this.isSubmitting = true;
    const OTPVerifiedTime = new Date();
    const Username = this.forgetpwdForm.controls['Username'].value;
    const Userotp = this.forgetpwdForm.controls['Userotp'].value;
    if (!Username || !Userotp) {
      this.isSubmitting = false;
      return;
    }
    if (this.validOtp === Userotp && this.OTP_EXPIRE_TIME >= OTPVerifiedTime) {
      const forgetpwdForm = { Username, Otpid: this.OTPID, Userotp };
      let data: any = await this.auth.VerifyUserOTP(forgetpwdForm);
      if (data && data['Message'] === 'Success') {
        this.toastr.success('OTP verified', 'Reset Password');
        this.isOTPVerified = true;
        this.isShowtxtOtp = false;
        this.isShowtxtNewPwd = true;
        this.isShowtxtReEntPwd = true;
        this.isShowbtnVerifyOtp = false;
        this.isShowbtnBack = true;
        this.forgetpwdForm.controls['Newpassword'].setValue('');
        this.forgetpwdForm.controls['Reenterpassword'].setValue('');
      } else {
        this.toastr.error('OTP Expired', 'Reset Password');
      }
    } else {
      this.toastr.error('OTP Does Not Match', 'Reset Password');
    }
    this.isSubmitting = false;
  }

  async setUserPassword() {
    if (this.forgetpwdForm.invalid || !this.isOTPVerified) {
      this.toastr.error('OTP Not Verified', 'Reset Password');
      return;
    }
    const forgetpwdForm = {
      Username: this.forgetpwdForm.controls['Username'].value,
      Newpassword: this.crypto.encrypt(
        this.forgetpwdForm.controls['Newpassword'].value
      ),
      Reenterpassword: this.crypto.encrypt(
        this.forgetpwdForm.controls['Reenterpassword'].value
      ),
      Passwordexpiredays:
        this.forgetpwdForm.controls['Passwordexpiredays'].value,
    };
    if (forgetpwdForm.Newpassword !== forgetpwdForm.Reenterpassword) {
      this.toastr.error(
        'New Password and Re-enter password do not match',
        'Reset Password'
      );
      return;
    }
    let data: any = await this.auth.UpdateUserPassword(forgetpwdForm);
    if (data && data['Message'] === 'Success') {
      this.toastr.success('Password set successfully', 'Reset Password');
      this.router.navigate(['/login']);
    }
  }

  async backtoOtp() {
    this.isOTPVerified = false;
    this.isShowtxtOtp = false;
    this.isShowtxtNewPwd = false;
    this.isShowtxtReEntPwd = false;
    this.isShowbtnVerifyOtp = false;
    this.isShowbtnBack = false;
    this.isShowbtnGenerateOtp = true;
    this.isShowtxtUsername = true;
    this.forgetpwdForm.controls['Username'].enable();
    this.forgetpwdForm.reset();
  }

  async cancel() {
    this.router.navigate(['/login']);
  }
}
