import {User} from './user.model';

export class Event{
    public id: number;
    public entityType: string;
    public entityId: number;
    public eventType: string;
    public message: string;
    public navRoute:string;
    public doneBy: User;
    public doneOn: any;
    public date: Date;
}