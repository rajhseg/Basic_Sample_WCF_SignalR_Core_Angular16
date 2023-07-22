import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigInitService {

  private environment: string = '';

  constructor() { }

  SetEnvironment(env: string) {
    this.environment = env;
  }

  GetEnvironment() {
    return this.environment;
  }
}
