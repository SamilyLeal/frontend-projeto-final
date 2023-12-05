import { AbstractControl, ValidatorFn } from '@angular/forms';

export function zipCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [a: string]: any } | null => {
    const zipCodeRegex = /^\d{5}\d{3}$/; 

    if (!control.value || control.value.match(zipCodeRegex)) {
      return null;
    } else {
      return { 'invalidZipCodeFormat': { value: control.value } };
    }
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [a: string]: any } | null => {
    const phoneRegex = /^(?:\d{8}|\d{9}|\d{10}|\d{11})$/;

    if(!control.value || control.value.match(phoneRegex)) {
      return null;
    } else {
      return { 'invalidPhoneFormat': { value: control.value }}
    }
  };
}