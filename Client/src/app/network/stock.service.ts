import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map"
import { HttpService } from "./http.service";
import { StockItem} from "../models/stock.model";

 
@Injectable()
export class StockService {
    constructor(private http: HttpService<StockItem>){}

    public getAll = () : Observable<StockItem[]> =>{
        return this.http.get("/stock")
            .map(res=>{
                return res.json();
            })
    }

    public getOneById = (id:number) : Observable<StockItem> =>{
        return this.http.get("/stock/"+id)
            .map(res=>res.json());
    } 
    
    public postComment = (stockId: number, comment:string) : Observable<Comment> =>{
        return this.http.post("/stock/" + stockId + "/comments", {message: comment})
            .map(res=>res.json());
    }

    public getCommentsOf = (id:number) : Observable<Comment[]> =>{
        return this.http.get("/stock/"+id+"/comments")
            .map(res=>res.json());
    }
}