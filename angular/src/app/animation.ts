import { trigger, style, animate, transition, keyframes, state } from '@angular/animations';

export const shakeAnimation = trigger('shake', [
    state('shake', style({})),
    transition('* => shake', [
        animate('1s', keyframes([
            style({ transform: 'translate3d(-5px, 0, 0)', offset: 0.1 }),
            style({ transform: 'translate3d(5px, 0, 0)', offset: 0.2 }),
            style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
            style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
            style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
            style({ transform: 'translate3d(-5px, 0, 0)', offset: 0.9 }),
            style({ transform: 'translate3d(5px, 0, 0)', offset: 1.0 })
        ]))
    ])
]);

export const slideInOutAnimation =  trigger('slideInOut', [
    transition(':enter', [
        style({ transform: 'translateX({{ enterFrom }})' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
    ], { params: { enterFrom: '100%' } }),
    transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX({{ leaveTo }})' }))
    ], { params: { leaveTo: '-100%' } })
])
