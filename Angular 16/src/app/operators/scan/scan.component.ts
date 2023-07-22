import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, of, scan, Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../server/api.service';
import { SignalrService } from '../../services/signalr.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartModel } from '../../ChartModel';
import { NgChartsModule } from 'ng2-charts';
import { TokenServiceService } from '../../token-service.service';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanComponent implements OnInit, OnDestroy {

  private token: string = '';
  public CharList: string[] = [];
  private service$!: Subscription;
  public chartData: any;

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    }
  };
  chartLabels: string[] = ['Real time data for the chart'];
  chartType: any = 'bar';
  chartLegend: boolean = true;

  chartSubscription$: Subscription;

  constructor(private cRef: ChangeDetectorRef, private dref: DestroyRef, private apiService: ApiService, private signalR: SignalrService, private tokenService: TokenServiceService) {

    this.service$ = this.apiService.SubscribeList().subscribe((x) => {
      console.log(x);
      this.CharList = x;
    });

    this.chartSubscription$ = this.signalR.subscribeData().subscribe((x) => {
      console.log(x);
      this.chartData = x;
      this.cRef.markForCheck();
    });

  }
    ngOnDestroy(): void {     
      this.service$.unsubscribe();
      this.chartSubscription$.unsubscribe();
    }

  ngOnInit(): void {

    let clicks$ = fromEvent(document.getElementById("click")!, 'click');

    let a1 = clicks$.pipe(
      scan(i => i= i+3, 3)
    ).subscribe((a) => {
      console.log(a);
    });

    this.dref.onDestroy(() => {
      a1.unsubscribe();
      this.service$.unsubscribe();
      this.chartSubscription$.unsubscribe();
    });
  }

  SendMessage() {
    this.signalR.SendMessage();
  }

  getData() {
    this.apiService.getList();
  }

  connectSignalR() {
    this.signalR.StartConnection();
    this.signalR.startHttpRequest();
  }

 async GetToken() {
    this.token = await this.tokenService.GetToken();
  }

  async LoginScanComponent() {
    this.token = await this.tokenService.GetToken();
  }

}
