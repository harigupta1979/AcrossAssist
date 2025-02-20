import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  keys: string = '202277$#@$^@ACPL';
  encrypt(value: string) {
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  decrypt(value: string) {
    value = decodeURIComponent(value);
    value = value.replace(/ /g, '+');
    value = value.replace(/  /g, '++');
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
