import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { LoginForm } from '../../entities';

@Component({
  selector: 'smf-auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {

  @Output() onSubmitForm = new EventEmitter();
  loginForm!: FormGroup;

  get controls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group(new LoginForm);
  }

  getLoginErrorMessage(): string {
    return this.controls['login'].hasError('required')
      ? 'Field has been required'
      : this.controls['login'].hasError('minlength')
      ? `Minimum symbol ${this.controls['login'].getError('minlength').requiredLength}`
      : this.controls['login'].hasError('maxlength')
      ? `Maximum symbol ${this.controls['login'].getError('maxlength').requiredLength}`
      : this.controls['login'].hasError('login')
      ? 'Login must contain latin letters in any case, signs "_" and "-"'
      : '';
  }

  getPasswordErrorMessage(): string {
    return this.controls['password'].hasError('required')
      ? 'Field has been required'
      : this.controls['password'].hasError('minlength')
      ? `Minimum symbol ${this.controls['password'].getError('minlength').requiredLength}`
      : this.controls['password'].hasError('maxlength')
      ? `Maximum symbol ${this.controls['password'].getError('maxlength').requiredLength}`
      : this.controls['password'].hasError('password')
      ? 'Password must contain latin letters, at least one number and one uppercase letter'
      : '';
  }

}
