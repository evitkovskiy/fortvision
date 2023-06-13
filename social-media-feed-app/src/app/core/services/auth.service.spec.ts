import { AuthService } from './auth.service';
import { LoginResponse } from '../../entities';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should set isAuthenticated to true and loginUser to login when login and password are correct', () => {
      const login = 'yauhen';
      const password = 'Yauhen96';
      const expectedResponse: LoginResponse = {
        success: true,
        message: 'Autorization by username yauhen',
        login: login
      };
      service.login(login, password).subscribe(response => {
        expect(response).toEqual(expectedResponse);
        expect(service.isAuthenticated).toBeTrue();
        expect(service.getLogin()).toEqual(login);
      });
    });

    it('should return error when login or password are incorrect', () => {
      const login = 'john';
      const password = 'Doe123';
      const expectedError = {
        success: false,
        message: 'Invalid login or password'
      };
      service.login(login, password).subscribe(
        () => {},
        error => {
          expect(error).toEqual(expectedError);
          expect(service.isAuthenticated).toBeFalse();
          expect(service.getLogin()).toBe('');
        }
      );
    });
  });

  describe('#logout', () => {
    it('should set isAuthenticated to false, remove the role from localStorage and navigate to /login', () => {
      spyOn(localStorage, 'removeItem');
      service.logout();
      expect(service.isAuthenticated).toBeFalse();
      expect(localStorage.removeItem).toHaveBeenCalledWith('role');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('#setLogin', () => {
    it('should set loginUser to the provided login and save it to localStorage', () => {
      const login = 'yauhen';
      service.setLogin(login);
      expect(service.getLogin()).toEqual(login);
      expect(localStorage.getItem('login')).toEqual(login);
    });
  });

  describe('#isAuthenticatedUser', () => {
    it('should return true if the user is authenticated (isAuthenticated is true)', () => {
      service.isAuthenticated = true;
      expect(service.isAuthenticatedUser()).toBeTrue();
    });

    it('should return true if the user is not authenticated but there is a login saved in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('yauhen');
      expect(service.isAuthenticatedUser()).toBeTrue();
    });

    it('should return false if the user is not authenticated and there is no login saved in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.isAuthenticatedUser()).toBeFalse();
    });
  });
});
