import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map"
import { HttpService } from "./http.service";
import { StockItem } from "../models/stock.model";
import { MapItem } from "app/map/map-item.model";

 
@Injectable()
export class StockService {
    constructor(private http: HttpService<StockItem>
    ){}

    public getAll = () : Observable<StockItem[]> =>{
        return this.http.get("/stock")
            .map(res=>{
                return res.json().map(a=>{if(a.imageUrl.match(/^#[0-9a-f]{6}$/)){a.colored=true;}return a;})
            })
    }

    public getAllAsMapItems = (): Observable<MapItem[]> =>{
        return this.http.get("/stock")
            .map(res=>{
                var r: StockItem[] = res.json();
                return r.map(v=>new MapItem(v.id, v.width, v.height, v.name, v.imageUrl));
            })
    }

    public getOneById = (id:number) : Observable<StockItem> =>{
        return this.http.get("/stock/"+id)
            .map(res=>{
            var obj = res.json();
            if(obj.imageUrl.match(/^#[0-9a-f]{6}$/)){obj.colored=true;}
            obj["ratingsList"] = obj["ratings"];
            delete obj["ratings"];
            return obj;
            })
            .catch(err=>{
                throw err;
            })
    }


    
    public createStockItem = (name: string, description:string, width:number, height:number, imgurl:string) : Observable<boolean> => {
        return this.http.post("/stock", {name: name, description:description, width:width, height:height, imageUrl:imgurl})
            .map(res=>res.ok);
    }

    public updateStockItem = (id:number, name: string, description:string, width:number, height:number, imgurl:string) : Observable<boolean> =>{
        return this.http.put("/stock/"+id, {name: name, description:description, width:width, height:height, imageUrl:imgurl})
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