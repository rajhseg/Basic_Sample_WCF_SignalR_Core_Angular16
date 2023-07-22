import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { concat, concatAll, concatMap, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-concatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concatmap.component.html',
  styleUrls: ['./concatmap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcatmapComponent implements OnInit {

  constructor(private dref: DestroyRef) {

  }

  ngOnInit(): void {
    let s1$ = interval(1000).pipe(take(5), map(x => 'source 1 ' + x));

    let s2$ = interval(500).pipe(take(3), map(y => 'source 2 ' + y));

    let a1 = concat(s1$, s2$).subscribe(x => {
      console.log(x);
    });

    let s3$ = interval(1000).pipe(
      take(5),
      map(x => s2$),
      concatAll()
    );

    let a2 = s3$.subscribe(x => {
      console.log(x);
    });

    let s4$ = interval(2000).pipe(
      take(4),
      concatMap(x => s2$)
    );

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
