import {User} from './user.model';
import {Comment} from './comment.model';
import {Rating} from './rating.model';
import {MapItem} from '../map/map-item.model';
// export class StockItem{
//     public id: number;
//     public name: string;
//     public description: string;
//     public imageUrl: string;
//     public width: number;
//     public height: number;
//     public creator: User;
//     public comments: Comment[];
//     public ratings: number;
//     public ratingsList: Rating[];

// }


export class StockItem extends MapItem{
    public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;
    public width: number;
    public height: number;
    public creator: User;
    public comments: Comment[];
    public ratings: number;
    public ratingsList: Rating[];
}