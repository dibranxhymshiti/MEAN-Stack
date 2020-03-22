import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ErrorComponent} from './error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private matDialog: MatDialog) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.matDialog.open(ErrorComponent, {width: '350px', data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}
