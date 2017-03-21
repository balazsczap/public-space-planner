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

    public createNew = (email: string): Observable<string> =>{
        var content = JSON.stringify(email);
        return this.http.post("/auth/firsttime", content)
            .map(res=>{
                var token = res.json()["token"];
                return token;
            });
    }

    public updateUser = (user: User): Observable<User> =>{
        var content = JSON.stringify(user);
        return this.http.put("/users/" + user.id, content)
            .map(res=>res.json());
    } 
}