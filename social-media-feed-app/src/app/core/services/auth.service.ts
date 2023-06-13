import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators'

// Interfaces
import { LoginResponse } from '../../entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;
  private loginUser = '';

  constructor(private router: Router) { }

  login(login: string, password: string): Observable<LoginResponse> {
    if (login === 'yauhen' && password === 'Yauhen96') {
      this.isAuthenticated = true;
      this.setLogin(login);
      return of({
        success: true,
        message: `Autorization by username ${login}`,
        login: this.loginUser
       }).pipe(delay(2000));
    }
    else {
        return timer(2000).pipe(
            switchMap(_ => {
              return throwError({
                success: false,
                message: 'Invalid login or password',
              });
            })
          );
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  setLogin(login: string): void {
    this.loginUser = login;
    localStorage.setItem('login', login);
  }

  getLogin(): string {
    return this.loginUser;
  }

  isAuthenticatedUser(): boolean {
    this.checkAuthStatusFromStorage();
    return this.isAuthenticated;
  }

  private checkAuthStatusFromStorage(): void {
    if (localStorage.getItem('login')) {
      this.loginUser = localStorage.getItem('login') as string;
      this.isAuthenticated = true;
    }
  }
}
