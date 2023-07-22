import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, Observable, retry, RetryConfig, timer } from 'rxjs';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let config: RetryConfig = {
      count: 2,
      delay: (error, retryCount) => {
        if (error) {
         return timer(3000)
        }
        throw error;
      }
    }

    return next.handle(request).pipe(retry(config));
  }
}
