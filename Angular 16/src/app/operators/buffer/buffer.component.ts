import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buffer, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-buffer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BufferComponent implements OnInit {

  constructor(private dref: DestroyRef) {

  }

  ngOnInit(): void {
    let click$ = fromEvent(document.getElementById('click')!, 'click');
    let interval$ = interval(1000);
    let a1 = interval$.pipe(buffer(click$)).subscribe((x) => {
      console.log(x);
    });

    this.dref.onDestroy(() => {
      a1.unsubscribe();
    });
  }

}
