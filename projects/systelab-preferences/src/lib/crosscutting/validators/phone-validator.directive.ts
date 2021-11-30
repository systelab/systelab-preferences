import {FormControl, NG_VALIDATORS,ValidationErrors, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

export function phoneValidator(control: FormControl): ValidationErrors | null {
  const RegExp = /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/;
  
  return RegExp.test(control.value) ? null : {
    phone: control.value
  };
}

@Directive({  
  selector: '[phoneValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: PhoneValidatorDirective,
      multi: true
  }]
})
export class PhoneValidatorDirective implements Validator { 
  
  validate(control: FormControl): ValidationErrors | null { 
      return phoneValidator(control);  
  }
}



