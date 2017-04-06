import {User} from './user.model';

export class Rating{
    public id: number;
    public value: number;
    public givenBy: User;
}