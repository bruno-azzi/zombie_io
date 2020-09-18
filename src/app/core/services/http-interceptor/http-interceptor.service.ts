import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from './../alert/alert.service';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptor implements HttpInterceptor {

  constructor(
    private alert: AlertService
  ) { }

  /**
   * Intercept all api requests
   * @param req request
   */
  intercept(req, next) {
    return next.handle(req.clone()).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  /**
   * Handle any error that occurs in a request and show error message to user
   * @param error error object
   */
  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.alert.showError('Error', 'This register was not found');
    } else {
      this.alert.showError('Error', 'Something went wrong');
    }
  }

}
