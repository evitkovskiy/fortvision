// import { Router } from "@angular/router";
// import { UrlInterceptor } from "./url-interceptor.interceptor";
// import { SnackbarService } from "src/app/shared/services";
// import { Observable, throwError } from "rxjs";
// import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
// import { TestBed } from "@angular/core/testing";
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('UrlInterceptor', () => {

//   let interceptor: UrlInterceptor;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let snackbarSpy: jasmine.SpyObj<SnackbarService>;
//   let httpEventSpy: Observable<HttpEvent<any>>;

//   beforeEach(() => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     snackbarSpy = jasmine.createSpyObj('SnackbarService', ['open']);

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         UrlInterceptor,
//         { provide: Router, useValue: routerSpy },
//         { provide: SnackbarService, useValue: snackbarSpy }
//       ]
//     });

//     interceptor = TestBed.inject(UrlInterceptor);
//   });

//   it('should be created', () => {
//     expect(interceptor).toBeTruthy();
//   });

//   describe('intercept', () => {

//     const req = new HttpRequest<any>('GET', '');

//     beforeEach(() => {
//       httpEventSpy = new Observable<HttpEvent<any>>();
//     });

//     it('should handle a successful request', () => {
//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(httpEventSpy);

//       const modifiedReq = req.clone({
//         url: 'http://localhost:3000/posts',
//       });

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() => {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).not.toHaveBeenCalled();
//         expect(snackbarSpy.open).not.toHaveBeenCalled();
//       });
//     });

//     it('should handle a 400 error', () => {
//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(throwError({ status: 400 }));

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() => {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//         expect(snackbarSpy.open).toHaveBeenCalled();
//       });
//     });

//     it('should handle a 401 error', () => {
//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(throwError({ status: 401 }));

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() => {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//         expect(snackbarSpy.open).toHaveBeenCalled();
//       });
//     });

//     it('should handle a 403 error', () => {
//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(throwError({ status: 403 }));

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() => {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//         expect(snackbarSpy.open).toHaveBeenCalled();
//       });
//     });

//     it('should handle a 404 error', () => {
//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(throwError({ status: 404 }));

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() => {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
//         expect(snackbarSpy.open).toHaveBeenCalled();
//       });
//     });

//     it('should handle a timeout error', () => {
//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(timeoutError());

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() => {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).not.toHaveBeenCalled();
//         expect(snackbarSpy.open).toHaveBeenCalled();
//       });
//     });

//     it('should handle an unknown error', () => {
//       const error = new Error('An unknown error occurred.');

//       spyOn(httpEventSpy, 'pipe').and.callThrough();

//       spyOn(TestBed.inject(HttpHandler), 'handle').and.returnValue(throwError(error));

//       interceptor.intercept(req, TestBed.inject(HttpHandler)).subscribe(() =>
//       {
//         expect(httpEventSpy.pipe).toHaveBeenCalled();
//         expect(routerSpy.navigate).not.toHaveBeenCalled();
//         expect(snackbarSpy.open).toHaveBeenCalled();
//       });
//     });

//     function timeoutError(): Observable<never> {
//       return throwError({ name: 'TimeoutError' });
//     }
//   });
// });
