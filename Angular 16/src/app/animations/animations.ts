import { animate, animateChild, group, keyframes, query, sequence, stagger, state, style, transition, trigger } from "@angular/animations";

export const FadeInAnimation = trigger('routeAnimations', [

  transition('* => *, void => *, * => void', [

    query(':enter', [style({ opacity: 0, position: 'absolute' })], { optional: true }),

    query(':leave', [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0, position: 'absolute' }))], { optional: true }),

    query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1, position: 'relative' }))], { optional: true }),

  ])

]);


export const onOffAnimations = trigger('onOffAnimations', [

  state('on', style({ opacity: 1 })),
  state('off', style({ opacity: 0 })),

  transition('on => off', [
    animate('3s', keyframes([
      style({ opacity: 0.7, offset: 0.4 }),
      style({ opacity: 0.4, offset: 0.7 }),
      style({ opacity: 0, offset: 1 })
    ]))
  ]),

  transition('off => on', [
    animate('3s', keyframes([
      style({ opacity: 0, offset: 0.4 }),
      style({ opacity: 0.4, offset: 0.7 }),
      style({ opacity: 0.7, offset: 1 }),
    ]))
  ]),

]);
