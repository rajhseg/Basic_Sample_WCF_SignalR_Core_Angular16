import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private AccessToken: WritableSignal<string> = signal('');

  public AccessToken$ = toObservable(this.AccessToken);

  public Token: string = '';

  constructor(private http: HttpClient, private cSer: CookieService) {
  }

  async GetToken(): Promise<void> {
    let prop = {}
    if (this.Token == '') {
      await this.http.post('https://localhost:5001/api/login', { UserName:'admin1', Password:'password2', Role: ''}, 
        { withCredentials: true}).toPromise();
      
      this.GetAntiForgeryToken();
    }
  }

   GetAntiForgeryToken() {
   this.http.get('https://localhost:5001/api/antiforgery/token', { withCredentials: true}).subscribe((x :any) => {
      let c = x.faq;
      localStorage.setItem("anti_token", c);
    });
  }
}
