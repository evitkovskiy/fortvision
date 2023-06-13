import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const loginRegExp: RegExp = /^[a-zA-Z0-9_-]*$/;

export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/;


export const loginValidators = [
    Validators.required,
    Validators.maxLength(16),
    Validators.minLength(3),
    loginValidtor()
]

export const passwordValidators = [
    Validators.required,
    Validators.maxLength(16),
    Validators.minLength(5),
    passwordValidator()
]

function loginValidtor(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        return loginRegExp.test(control.value) ? null : {login: true}
    };
}

function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        return passwordRegex.test(control.value) ? null : {password: true}
    };
}
