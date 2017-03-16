import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { HttpService } from '../network/http.service';
import { User } from '../models/user.model';

 
@Injectable()
export class UserService {

    constructor(private http: HttpService<User>) {

    }
 
    public getAll = () : Observable<User[]> =>{
    	return this.http.get('/users').map(res => res.json());
    }

    public getUserById = (id: number): Observable<User> =>{
        return this.http.get("/users/" + id).map(res=> {return res.json()});
    }

    public getProtected = () : Observable<string> =>{
        return this.http.get("/test/user").map(res=>res.json());
    }
}