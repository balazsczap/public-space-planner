import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Notification } from './notifications.model';

@Injectable()
export class NotificationsService {í
    private _notifications = new Subject<Notification>();

    public noteAdded = this._notifications.asObservable();

    // public add(notification: Notification) {
    //     this._notifications.next(notification);
    // }

    public create(type: string, message: string, duration: number = 3000){
    	this._notifications.next(new Notification(type,message,duration));
    }

    public readonly TYPE = {
    	ERROR: "error",
    	WARNING: "warning",
        NOTE: "note",
        SUCCESS: "success"
    }

    public readonly DURATION = { 
        SHORT: 1500,
        MEDIUM: 3000,
        LONG: 6000
    }

    
}