import {User} from './user.model';

export class Comment{
    public id: number;
    public time: Date;
    public message: string;
    public createdBy: User;
}

