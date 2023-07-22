import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../server/api.service';

@Component({
  selector: 'app-cont',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cont.component.html',
  styleUrls: ['./cont.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'sampleProp': 'Testing1',
    '(click)':'onClick($event)'
  },
  hostDirectives:[]
})
export class ContComponent {

  constructor(@Optional() @Host() private api: ApiService, private cdRef: ChangeDetectorRef)
  {

  }

  onClick($evt: PointerEvent) {
    console.log($evt);
  }
}
