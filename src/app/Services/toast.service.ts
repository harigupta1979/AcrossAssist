import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  error(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  info(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['info-snackbar'],
    });
  }

  warn(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['warn-snackbar'],
    });
  }

  clear() {
    this.snackBar.dismiss();
  }
}
