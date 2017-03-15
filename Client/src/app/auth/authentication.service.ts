import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ConfigurationService } from '../configuration/configuration.service';
import { RestService } from '../network/rest.service';
import {User} from '../models/user.model';

 
@Injectable()
export class AuthenticationService {
    public token: string = "";
    public _userId: number;
    public user: User;
    constructor(private _restService: RestService<any>) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('userCredentials'));
        console.log(currentUser);
        _restService.setTokenProvider(this);
        if(currentUser){
            this.token = currentUser.token;
            this._userId = currentUser.id;
            this.user = JSON.parse(localStorage.getItem('userData'));
        }
    }
 
    // login(username: string, password: string): Observable<boolean> {
    //     return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let token = response.json() && response.json().token;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;
 
    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
    //                 // return true to indicate successful login
    //                 return true;
    //             } else {
    //                 // return false to indicate failed login
    //                 return false;
    //             }
    //         });
    // }



    logIn(username: string, password: string): Observable<boolean> {

        // return this._restService.logIn(username, password)
        //             .map((res : Response)=> {
        //                 if(res.ok==false){
        //                     return false;
        //                 }
        //                 this.token = res["access_token"];
        //                 this._userId = res["id"];
        //                 localStorage.setItem('currentUser', JSON.stringify({ id: this._userId, token: this.token }));
        //                 return true;
        //             });

        return this._restService.logIn(username, password)
                  .flatMap(data=>{
                    if(data.ok==false){
                      return Observable.of<User>(null);
                    }
                    this.token = data["access_token"];
                    this._userId = data["id"];
                    localStorage.setItem('userCredentials', JSON.stringify({ id: this._userId, token: this.token }));
                    return this._restService.getUserById(this._userId);
                  }).map(data=>{
                    if(data==null){
                      return false;
                    }
                    this.user = data;
                    localStorage.setItem('userData', JSON.stringify(this.user));
                    return true;
                  });
    }


    isLoggedIn() : boolean {
        return this.token && this.user ? true : false;
    }    

    isAdmin() : boolean {
        return this.token && this.user && this.user.role==="admin";
    }

    // getLoggedIn() : Observable<User>  {
    //     if(this._currentUser && this._currentUser.id != this._userId){
    //         return this._restService.getUserById(this._userId).map(data => {
    //             // var u = new User({id : data["id"], name: data["name"],username: data["username"],role : data["role"]});
    //             var u = new User();

    //             u.id = data["id"];
    //             u.name = data["name"];
    //             u.username = data["username"];
    //             u.role = data["role"];
    //             this._currentUser = u;
    //             return u;
    //         })
    //     }
    //     else if(this._currentUser){
    //         return Observable.of(null);
    //     }
    //     else{
    //         return Observable.of(this._currentUser);
    //     }
    // }

 
    logOut(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = null;
        localStorage.removeItem('userData');
        localStorage.removeItem('userCredentials');
    }
}