import {User} from './user.model';
import {Comment} from './comment.model';

export class StockItem{
    public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;
    public creator: User;
    public comments: Comment[]
    constructor(id:number, name: string, description: string){
        this.id = id; this.name=name; this.description = description; 
    }
}