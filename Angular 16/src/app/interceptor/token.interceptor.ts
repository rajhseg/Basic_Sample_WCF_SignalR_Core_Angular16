import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, first, mergeMap, Observable } from 'rxjs';
import { SignalrService } from '../services/signalr.service';
import { TokenServiceService } from '../token-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('/api/login')) {
      return next.handle(request);
    }
    else {

      let reqClone = request.clone({
        setHeaders: {
          'authorization': 'Bearer ' + this.tokenService.Token
        }
      });

      return next.handle(reqClone);
    }
  }
}
