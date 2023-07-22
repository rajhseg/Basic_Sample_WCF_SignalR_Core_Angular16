import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-useanimation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './useanimation.component.html',
  styleUrls: ['./useanimation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: []
})
export class UseanimationComponent {


  constructor() {

  }

}
