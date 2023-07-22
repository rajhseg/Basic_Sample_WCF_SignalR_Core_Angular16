import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private list: string[] = [];
  private listBehavior$: BehaviorSubject<string[]> = new BehaviorSubject(this.list);

  constructor(private http: HttpClient) { }

  getData(): Observable<string> {   
    return this.http.get<string>("api/sample/data");
  }

  SubscribeList(): BehaviorSubject<string[]> {
    return this.listBehavior$;
  }

  getList() {
    this.list = [];

    of('a', 'aa', 'b').subscribe((x) => {
      this.list.push(x);
      this.listBehavior$.next(this.list);
    });

  }
}
