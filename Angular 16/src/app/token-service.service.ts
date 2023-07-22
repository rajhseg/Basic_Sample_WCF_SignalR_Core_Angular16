import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private AccessToken: WritableSignal<string> = signal('');

  public AccessToken$ = toObservable(this.AccessToken);

  public Token: string = '';

  constructor(private http: HttpClient) {
  }

  async GetToken(): Promise<string> {
    if (this.Token == '') {
      let result: any = await this.http.get('https://localhost:5001/api/login').toPromise()
      this.AccessToken = result.token
      this.Token = result.token;
    }
    return this.Token;
  }
}
