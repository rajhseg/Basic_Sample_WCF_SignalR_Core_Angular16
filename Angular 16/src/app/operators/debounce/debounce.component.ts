import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounce, debounceTime, fromEvent, interval, of, range, timeInterval } from 'rxjs';

@Component({
  selector: 'app-debounce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebounceComponent implements OnInit {

  constructor(private dref: DestroyRef) {

  }

  ngOnInit(): void {

    let clicks$ = fromEvent(document.getElementById('click')!, 'click');

    let a1 = clicks$.pipe(debounceTime(100)).subscribe((x) => {
      console.log(x);
    });

    this.dref.onDestroy(() => {
      a1.unsubscribe();      
    });
  }

}
