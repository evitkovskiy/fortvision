import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from  '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { IErrorDetails } from '../../entities/'

// Services
import { SnackbarService } from '../../shared/services';

// Models
import { SnackbarMessageType } from '../../shared/models';

const TIMEOUT = 10000;
const UPLOAD_TIMEOUT = 30000;

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  private BASE_URL = 'http://localhost:3000/posts';

  constructor(
    private router: Router,
    private snackBarService: SnackbarService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      url: `${this.BASE_URL}${req.url}`,
    });
    const timeoutVal = req.reportProgress ? UPLOAD_TIMEOUT : TIMEOUT;

    return next.handle(modifiedReq).pipe(
      timeout(timeoutVal),
      catchError((err: HttpErrorResponse) => {
        let errorDetails: IErrorDetails = { errorCode: err.status, errorMessage: '' };

        if (err instanceof TimeoutError) {
          errorDetails = {
            errorCode: 408,
            errorMessage: 'The request has timed out.',
          };
        } else if (err.error instanceof Error) {
          errorDetails.errorMessage = (err.error as Error).message;
        } else if (typeof err.error === 'string') {
          errorDetails.errorMessage = err.error;
        } else {
          errorDetails.errorMessage = err.message || 'An unknown error occurred.';
        }

        switch (errorDetails.errorCode) {
          case 400:
          case 401:
          case 403:
            this.router.navigate(['/login']);
            break;
          case 404:
            this.router.navigate(['/404']);
            break;
          case 0:
            errorDetails = {
              errorCode: 0,
              errorMessage: 'Unable to connect to the server. Please check your internet connection.',
            };
            break;
          default:
            errorDetails.errorMessage = errorDetails.errorMessage || 'An unknown error occurred.';
            break;
        }

        this.snackBarService.open(errorDetails.errorMessage, SnackbarMessageType.Error);
        return throwError(() => errorDetails);
      }),
    );
  }
}
