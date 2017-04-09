import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map"
import { HttpService } from "./http.service";
import { Event } from "../models/event.model";

 
@Injectable()
export class EventsService {
    constructor(private http: HttpService<Event>
    ){}

    public getTop = (): Observable<Event[]> => {
        return this.http.get("/events"+"?from=0"+"&to=10")
            .map(res=>res.json());
    }

}