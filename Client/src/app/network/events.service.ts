import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { HttpService } from "./http.service";
import {StockService} from "./stock.service";
import {UserService} from "./user.service";
import { Event } from "../models/event.model";

 
@Injectable()
export class EventsService {
    constructor(private http: HttpService<Event>,
    private userService: UserService,
    private stockService: StockService
    ){}

    public getTop = (): Observable<Event[]> => {
        return this.http.get("/events"+"?from=0"+"&to=10")
            .map(res=>res.json());
    }

}