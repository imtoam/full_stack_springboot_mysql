import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      //console.log(today);
      var due = new Date(control.value);
      //console.log(due);
      due.setHours(due.getHours()+(due.getTimezoneOffset()/60));
      //console.log(due);
      if(due.valueOf() < today.valueOf())
        return  {futureDate: {value: control.value}};
      else
        return null;
      };
}