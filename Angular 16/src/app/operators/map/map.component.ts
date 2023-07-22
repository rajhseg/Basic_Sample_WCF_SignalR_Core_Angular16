import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { BehaviorSubject, concatMap, exhaustMap, interval, mergeMap, of, skip, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import { Logger } from '../../Logger';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives:[]
})
export default class MapComponent implements OnInit, AfterViewInit {

  public mlist: Array<string> = new Array<string>();
  public behaviourMlist: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(this.mlist);
  public bmList: any=null;

  constructor(@Inject('apiurl') private apiUrl: string, private http: HttpClient, private logger: Logger) {
    this.logger.LogError();
  }

  ngAfterViewInit(): void {
    this.behaviourMlist.subscribe((x)=>{
      this.bmList = x;
    });
  }

  ngOnInit(): void {

    let getUrl = `${this.apiUrl}api/users/`
    // Merge Map
    let a1$ = of(1,2,3,4,5)
              .pipe(take(5),mergeMap(x=> this.http.get(getUrl+x)))
              .subscribe((result: any)=> {
              console.log('MergeMap ' + result.data.id);    
              this.mlist.push('MergeMap ' +result.data.id);   
              this.behaviourMlist.next(this.mlist);     
  });   

    // Concat Map    
    let a2$ = of(1,2,3,4,5)
              .pipe(take(5), concatMap(x=> this.http.get(getUrl+x)))
              .subscribe((result: any)=> {
              console.log('ConcatMap ' + result.data.id);            
  });   

    // Switch Map
    let a3$ = of(1,2,3,4,5)
    .pipe(take(5), switchMap(x=> this.http.get(getUrl+x)))
    .subscribe((result: any)=> {
        console.log('SwitchMap ' + result.data.id);            
    });   

    // Exhaust Map
    let a4$ = of(1,2,3,4,5).pipe(take(5), exhaustMap(x=> this.http.get(getUrl+x)))
    .subscribe((result:any)=>{
      console.log('ExhaustMap ' + result.data.id);   
    });
  }

}
