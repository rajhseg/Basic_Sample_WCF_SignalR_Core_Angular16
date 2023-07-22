import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, interval, of, take, takeLast, takeUntil, map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-take',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakeComponent implements OnInit {

  constructor(private dref: DestroyRef) {

    let of$ = of(1, 4, 6, 7, 8);

    let a1 = of$.pipe(take(2)).subscribe((x) => {
      console.log(x);
    });

    let a2 = of$.pipe(takeLast(2)).subscribe((x) => {
      console.log(x);
    });


    let a3 = of(1, 2, 3, 4, 5, 6).pipe(
      takeWhile(x => x > 1)
    ).subscribe((b) => {
      console.log('while ' + b);
    });

    dref.onDestroy(() => {
      a1.unsubscribe();
      a2.unsubscribe();
      a3.unsubscribe();
    });
  }


  ngOnInit(): void {

    let btnclickEvent = fromEvent(document.getElementById('takeUntil')!, 'click');

    let a4 = interval(1000).pipe(
      map(x => 'take 1 ' + x),
      takeUntil(btnclickEvent)
    ).subscribe((v) => {
      console.log(v);
    });

    this.dref.onDestroy(() => {
      a4.unsubscribe();
    });

  }

}
