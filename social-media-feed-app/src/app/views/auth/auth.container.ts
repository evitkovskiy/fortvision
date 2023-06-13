import { ChangeDetectionStrategy, Component, OnDestroy, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

// Classes
import { Watcher } from '../../classes/watcher';

// Interfaces
import { LoginResponse } from '../../entities';

// Services
import { AuthService } from '../../core';
import { SnackbarService, LoaderService } from '../../shared/services';

// Models
import { SnackbarMessageType } from '../../shared/models';

export interface LoginEvent {
  login: string;
  password: string;
}


@Component({
  selector: 'smf-auth',
  template: `
    <smf-auth-component
      (onSubmitForm)="submitForm($event)"
      >
    </smf-auth-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthContainer extends Watcher implements OnDestroy {

  constructor(
    private router: Router,
    @SkipSelf() private authService: AuthService,
    @SkipSelf() private snackbarService: SnackbarService,
    @SkipSelf() private loader: LoaderService
    )
  {
    super();
  }

  submitForm(event: LoginEvent): void {
    this.loader.show();
    const {login, password} = event;
    this.authService.login(login, password).pipe(
      switchMap((response: LoginResponse) => {
        this.snackbarService.open(`Login by ${response.login}`, SnackbarMessageType.Success);
        this.loader.hide();
        return this.router.navigate(['/feed']);
      }),
      catchError((error: LoginResponse) => {
        this.snackbarService.open(`${error.message}`, SnackbarMessageType.Error);
        this.loader.hide();
        return EMPTY;
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
