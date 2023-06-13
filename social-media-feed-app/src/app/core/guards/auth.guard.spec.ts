import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticatedUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if the user is authenticated', () => {
    authServiceSpy.isAuthenticatedUser.and.returnValue(true);
    const result = guard.canActivate();
    expect(result).toBeTrue();
    expect(authServiceSpy.isAuthenticatedUser).toHaveBeenCalled();
  });

  it('should redirect to login page if the user is not authenticated', () => {
    authServiceSpy.isAuthenticatedUser.and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(authServiceSpy.isAuthenticatedUser).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
