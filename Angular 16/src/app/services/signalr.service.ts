import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { BehaviorSubject, first, mergeMap } from 'rxjs';

import { ChartModel } from '../ChartModel';
import { TokenServiceService } from '../token-service.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public data: ChartModel[] = [];  
  public token: string | null = '';

  public dataObservable$: BehaviorSubject<ChartModel[]> = new BehaviorSubject<ChartModel[]>(this.data);

  private hubConnection!: signalR.HubConnection;

  constructor(private http: HttpClient, private tokenService: TokenServiceService) {
    
  }

  subscribeData() {
    return this.dataObservable$;
  }

  async StartConnection() {
    let accessToken: string = '';

    accessToken = await this.tokenService.GetToken();

    console.log('accessTokenn');
    console.log(accessToken);

    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart', {
        accessTokenFactory: () => accessToken,        
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets
      }).withAutomaticReconnect().build();

    this.hubConnection.start().then(() => console.log("Connection started")).catch((err) => console.log("error " + err));

    this.hubConnection.on('TransferChartData', (data) => {
      this.data = data;
      this.dataObservable$.next(this.data);

    });

    this.hubConnection.on('callback', (data) => {
      console.log('hub callback');
      console.log(data);
    });
  }

  public startHttpRequest(){
    this.http.get('https://localhost:5001/api/chart')
      .subscribe(res => {
        console.log(res);
      });     
  }

  public SendMessage() {
    this.hubConnection.invoke('sendToCaller',"ASDFG");
  }
}
