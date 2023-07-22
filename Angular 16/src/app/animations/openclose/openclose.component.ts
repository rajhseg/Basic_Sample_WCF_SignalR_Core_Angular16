import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, group, keyframes, sequence, state, style, transition, trigger, AnimationEvent, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-openclose',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './openclose.component.html',
  styleUrls: ['./openclose.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [

      state('open', style({
        opacity: 0.7,
        backgroundColor: 'red',        
      })),

      state('close', style({
        opacity: 1,
        backgroundColor:'blue'
      })),

      transition('open => close', [
        style({fontSize: 14}),
        animate('0.5s', style({ fontSize: 18}))
      ]),

      transition('close => open', [
        style({ transform: 'translateX(0%)'}),
        animate('4s', style({ transform:'translateX(100%)'}))
      ]),

      transition('void => close', [
        group([
          animate('6s ease-in', keyframes([
            style({ backgroundColor: 'red', offset: 0 }),
            style({ backgroundColor: 'orange', offset: 0.3 }),
            style({ backgroundColor: 'purple', offset: 0.6 }),
            style({ backgroundColor: 'blue', offset: 1 })
          ])),
          animate('3s', style({ color:'white'}))
        ]),

        sequence([
          animate('7s ease-in', keyframes([
            style({ backgroundColor: 'yellow' }),
            style({ backgroundColor: 'red' }),
            style({ backgroundColor: 'black' }),
          ])),
          animate('4s ease-in', keyframes([
            style({ backgroundColor: 'purple' }),
            style({ backgroundColor: 'cyan' }),
          ]))
        ])

      ])

    ]),

    trigger('queryAnimate', [

      transition('* => goAnimate', [

        query('h1', style({ opacity: 0, fontSize: 20 })),
        query('.content', style({ opacity: 0, fontSize: 20 })),

        query('h1', animate('4s', style({ opacity: 1 }))),
        query('.content', animate('4s', style({ opacity: 1 }))),

      ])
    
    ]),

    trigger('listAnimation', [

      transition('* => *', [

        query(':leave',
          [
            style({ transform: 'translateY(0)' }),

            stagger(100, [
              style({ transform: 'translateY(20px)' }),
            animate('0.5s', style({ opacity: 0, transform:'translateY(-100px)' }))
          ])
        ], { optional: true }),

        query(':enter',
        [
          style({ opacity: 0, transform: 'translateY(-100px)' }),

          stagger(100, [
            style({transform:'translateY(40px)'}),
            animate('0.5s', style({ opacity: 1, transform:'translateY(0px)'}))
          ])
        ], { optional: true })
      ])

    ])
  ]
})
export class OpencloseComponent {
  isOpen: boolean = false;
  exp: string = '';

  animationsDisabled: boolean = false;

  items: number[] = [];

  showItems() {
    this.items = [0, 1, 2, 3, 4];
  }

  hideItems() {
    this.items = [];
  }

  toggle() {
    this.items.length ? this.hideItems() : this.showItems();
  }

  click(): void {
    this.isOpen = !this.isOpen;
    this.exp = 'goAnimate';
  }

  enableAnimation() {
    this.animationsDisabled = true;
  }

  disableAnimation(): void {
    this.animationsDisabled = false;
  }

  startEvent(event: AnimationEvent): void {
    console.log('start event');
    console.log(event);
  }

  doneEvent(event: AnimationEvent): void {
    console.log('done event');
    console.log(event);
  }
}
