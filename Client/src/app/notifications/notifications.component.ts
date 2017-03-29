import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';

import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    // template:`
    animations: [
        trigger('remove', [
          state('true', style({
          })),
          state('false',   style({
             opacity:0,
             transform: 'translateY(-300%)'
          })),
          // transition('void => true', animate('500ms ease-in')),
          transition('void => true', [
              animate(300, keyframes([
                style({opacity: 0, transform: 'translateY(-100%)',     offset: 0}),
                style({opacity: 1, transform: 'translateY(0%)', offset: 1})
              ]))
            ]),
          transition('true  => false', animate('500ms ease-out'))
        ])
      ]
    // `
})
export class NotificationsComponent {
    private _notes: Notification[];
    constructor(private _notifications: NotificationsService) {
        this._notes = new Array<Notification>();

        _notifications.noteAdded.subscribe(note => {
            this._notes.unshift(note);

            setTimeout(() => { this.removeNote.bind(this)(note) }, note.duration);
        });

    }

    private removeNote(note) {
        note.active='false';

        setTimeout(()=>{
            let index = this._notes.indexOf(note);

            if (index >= 0) {
                this._notes.splice(index, 1);
            }
        }, 800);

    }


}
