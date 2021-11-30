import { NgModule } from '@angular/core';
import { EmailValidatorDirective } from './crosscutting/validators/email-validator.directive';
import { PhoneValidatorDirective } from './crosscutting/validators/phone-validator.directive';
import { UrlValidatorDirective } from './crosscutting/validators/url-validator.directive';

@NgModule({    
    declarations: [
        EmailValidatorDirective,
        PhoneValidatorDirective,
        UrlValidatorDirective        	  
    ],
    exports: [
        EmailValidatorDirective,
        PhoneValidatorDirective,
        UrlValidatorDirective,	  
    ]
  })
export class SystelabPreferencesModule {
}
