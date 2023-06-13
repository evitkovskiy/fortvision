import { AbstractControl, ValidationErrors } from '@angular/forms';

import {
  loginValidators,
  passwordValidators
} from './auth.validators';

export class LoginForm {
  login: (string | ((control: AbstractControl) => ValidationErrors)[])[];
  password: (string | ((control: AbstractControl) => ValidationErrors)[])[];

  constructor() {
    this.login = ['', loginValidators as ((control: AbstractControl) => ValidationErrors)[]];
    this.password = ['', passwordValidators as ((control: AbstractControl) => ValidationErrors)[]];
  }
}
