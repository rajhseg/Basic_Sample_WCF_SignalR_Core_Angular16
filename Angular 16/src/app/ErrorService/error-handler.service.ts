import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    if (error) {
      console.log('testing');
      console.log(error);
    }
  }
}
