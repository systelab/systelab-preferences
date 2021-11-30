import {FormControl, NG_VALIDATORS,ValidationErrors, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

export function emailValidator(control: FormControl): ValidationErrors | null {
  const RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/; 
  
  return RegExp.test(control.value) ? null : {
    email: control.value
  };
}

@Directive({  
  selector: '[emailValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
  }]
})
export class EmailValidatorDirective implements Validator { 
  
  validate(control: FormControl): ValidationErrors | null { 
      return emailValidator(control);  
  }
}



