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
    	return this.http.get('/users').map(res => {
            return res.json();
        })
        .catch(err=>{
            return Observable.throw(err);
        });
    }

    public getUserById = (id: number): Observable<User> =>{
        return this.http.get("/users/" + id).map(res=> {return res.json()});
    }

    public getProtected = () : Observable<string> =>{
        return this.http.get("/test/user").map(res=>res.json());
    }

    public createNew = (name: string, email: string, role:string): Observable<string> =>{
        var content = JSON.stringify({name:name,email:email,role:role});

        return this.http.post('/users/', content)
            .flatMap(res=>{
                // console.log(res);
                return this.http.post('/auth/firsttime', JSON.stringify(email))
                        .map(res=>{
                            return res.json();
                        })
            })
            
        // return this.http.post("/auth/firsttime", content)
        //     .map(res=>{
        //         var token = res.json()["token"];
        //         return token;
        //     });
    }

    public updateUser = (user: User): Observable<User> =>{
        var content = JSON.stringify(user);
        return this.http.put("/users/" + user.id, content)
            .map(res=>res.json());
    } 

    public getMapOf = (user:User):Observable<string>=>{
        return this.http.get(`/users/${user.id}/plan`).map(r=>r.text());
    }
}