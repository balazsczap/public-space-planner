import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map"
import { HttpService } from "./http.service";
import { StockItem} from "../models/stock.model";

 
@Injectable()
export class StockService {
    constructor(private http: HttpService<StockItem>
    ){}

    public getAll = () : Observable<StockItem[]> =>{
        return this.http.get("/stock")
            .map(res=>{
                return res.json();
            })
    }

    public getOneById = (id:number) : Observable<StockItem> =>{
        return this.http.get("/stock/"+id)
            .map(res=>{
            var obj = res.json();
                obj["ratingsList"] = obj["ratings"];
                delete obj["ratings"];
                return obj;
            })
            .catch(err=>{
                throw err;
            })
    } 
    
    public createStockItem = (name: string, description:string) : Observable<boolean> => {
        return this.http.post("/stock", {name: name, description:description})
            .map(res=>res.ok);
    }

    public updateStockItem = (id:number, name: string, description:string) : Observable<boolean> =>{
        return this.http.put("/stock/"+id, {name:name, description:description})
            .map(res=>res.ok);
    }

    public deleteItem = (id: number): Observable<boolean> =>{
        return this.http.delete("/stock/"+id)
            .map(res=>res.ok);
    }

    public postComment = (stockId: number, comment:string) : Observable<Comment> =>{
        return this.http.post("/stock/" + stockId + "/comments", {message: comment})
            .map(res=>res.json());
    }

    public getCommentsOf = (stockId:number) : Observable<Comment[]> =>{
        return this.http.get("/stock/"+stockId+"/comments")
            .map(res=>res.json());
    }

    public deleteCommentOf = (stockId: number, commentId:number) : Observable<boolean> => {
        return this.http.delete('/stock/' + stockId + '/comments/' + commentId)
            .map(res=>res.ok);
    }

    public upvoteItem = (stockId: number): Observable<boolean>=>{
        return this.http.post('/stock/'+stockId+"/upvote", {})
            .map(res => res.ok);
    }

    public downvoteItem = (stockId: number): Observable<boolean>=>{
        return this.http.post('/stock/'+stockId+"/downvote", {})
            .map(res => res.ok);
    }

}