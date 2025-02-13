import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['success-snackbar'], // ✅ Green Success Style
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showError(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['error-snackbar'], // ✅ Red Error Style
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showWarning(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['warn-snackbar'], // ✅ Yellow Warning Style
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showInfo(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['info-snackbar'], // ✅ Blue Info Style
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  clear() {
    this.snackBar.dismiss();
  }
}
