import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, merge, map, take, mergeAll, mergeMap } from 'rxjs';

@Component({
  selector: 'app-mergemap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mergemap.component.html',
  styleUrls: ['./mergemap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergemapComponent {
  constructor(private dref: DestroyRef) {
    let s1$ = interval(1000).pipe(
      map(x => 's1 ' + x),
      take(5)
    );

    let s2$ = interval(500).pipe(map(y => 's2 ' + y), take(4));

    let s3$ = interval(1000).pipe(
      take(2),
      map(x => s2$),
      mergeAll(),
    );

    let s4$ = interval(1000).pipe(
      take(2),
      mergeMap(x => s2$)
    );


    let a1 = merge(s1$, s2$).subscribe(val => {
      console.log(val);
    });

    let a2 = s3$.subscribe(val => {
      console.log(val);
    });

    let a3 = s4$.subscribe(x => {
      console.log(x);
    });

    this.dref.onDestroy(() => {
      a1.unsubscribe();
      a2.unsubscribe();
      a3.unsubscribe();
    })
  }
}
