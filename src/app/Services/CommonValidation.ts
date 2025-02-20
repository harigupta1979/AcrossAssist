import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class validationService {
  public OnlyNumber(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      event.preventDefault();
    }
  }

  public OnlyNumberContactValid(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // public AlphaNumeric(event) {
  //   var inp = String.fromCharCode(event.keyCode);
  //   if (/[a-zA-Z0-9]/.test(inp)) {
  //     return true;
  //   } else {
  //     event.preventDefault();
  //     return false;
  //   }
  // }
  public AlphaNumeric(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9\s]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  public allowAlphaSpecial(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      (charCode >= 32 && charCode <= 47) ||
      (charCode >= 58 && charCode <= 64) ||
      (charCode >= 91 && charCode <= 96) ||
      (charCode >= 123 && charCode <= 126)
    ) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  public lettersOnly(event: KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      var inp = String.fromCharCode(event.keyCode);
      if (/^[a-zA-Z \s \b]+$/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    } else {
      return false;
    }
  }

  public AlphaNumericHyphen(event: KeyboardEvent) {
    if (/^[a-zA-Z0-9\- ]*$/.test(event.key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  public AllowSpecialAlpha(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    //const allowedCharacters = /^[a-zA-Z\-& ]*$/;
    const allowedCharacters = /^[a-zA-Z0-9\-&@/ ]*$/;

    if (allowedCharacters.test(String.fromCharCode(charCode))) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  public decimalOnly(event: KeyboardEvent) {
    let txt = (<HTMLInputElement>event.target).value.trim();
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

  public dateOnly(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^\d{2}-\d{2}-\d{4}$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  public BankCode(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // public decimalOnly(event): boolean {
  //     const charCode = (event.which) ? event.which : event.keyCode;
  //     if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57)) {
  //       return false;
  //     }
  //     return true;
  //   }
}
