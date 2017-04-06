import {User} from './user.model';
import {Comment} from './comment.model';
import {Rating} from './rating.model';

export class StockItem{
    public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;
    public creator: User;
    public comments: Comment[];
    public ratings: number;
    public ratingsList: Rating[];

}