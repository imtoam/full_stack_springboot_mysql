import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var today = new Date();
      if(control.value < today)
        return  {futureDate: {value: control.value}};
      else
        return null;
      };
}