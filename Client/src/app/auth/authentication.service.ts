import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ConfigurationService } from '../configuration/configuration.service';
import { User } from '../models/user.model';
import { UserService } from '../network/user.service';
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
    public token: string = "";
    public _userId: number;
    public user: User;
    constructor(private _httpService: Http,
     private _config: ConfigurationService,
      private _router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('userCredentials'));

        if(currentUser){
            this.token = currentUser.token;
            this._userId = currentUser.id;
            this.user = JSON.parse(localStorage.getItem('userData'));

            this.getUserData()
                .subscribe(data=>{
                    console.log(data);
                    if(!data){
                        this.logOut();

                    }
                });
        }
        else{
            // this._route.params.subscribe(params=>{
            //     console.log(params["token"]);
            //     this.logOut();
                
            // })
        }

    }
 
    setFirstTimeToken(token:string):Observable<boolean>{
        this.token=token;
        return this._httpService.get(this._config.ApiUrl+"/auth/"+token)
            .flatMap((data)=>{
                var id = data.json();
                this._userId=id;    
                return this.getUserData()
            })
            .catch(err=>{
                    if(err.status==400){
                        return Observable.of(false);                    
                    }
                });
            
        
    }

    //does a http post to the authentication endpoint, gets the response,
    //parses it for the user id and token, and gets the user data for display
    logIn(username: string, password: string): Observable<boolean> {
        let headers = new Headers();
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._httpService.post(this._config.ApiUrl+"/auth", body, {headers: headers})
            .map(res=> res.json())
            .flatMap(data=>{
                if(data.ok==false){
                  return Observable.of<User>(null);
                }
                this.token = data["access_token"];
                this._userId = data["id"];
                localStorage.setItem('userCredentials', JSON.stringify({ id: this._userId, token: this.token }));
                // return this._userService.getUserById(this._userId);
                return this.getUserData();
            })
            .catch(err=>{
                if(err.status==400 && err.statusText==="Bad Request"){
                    return Observable.of(false);
                }
                if(err.status>=400 && err.status<500){
                    return Observable.throw(`Client error (${err.status})`);
                }
                if(err.status>=500 && err.status<600){
                    return Observable.throw(`Server error (${err.status})`);
                }
                return err;
            })


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

        // return this._restService.logIn(username, password)
        //           .flatMap(data=>{
        //             if(data.ok==false){
        //               return Observable.of<User>(null);
        //             }
        //             this.token = data["access_token"];
        //             this._userId = data["id"];
        //             localStorage.setItem('userCredentials', JSON.stringify({ id: this._userId, token: this.token }));
        //             return this._restService.getUserById(this._userId);
        //           }).map(data=>{
        //             if(data==null){
        //               return false;
        //             }
        //             this.user = data;
        //             localStorage.setItem('userData', JSON.stringify(this.user));
        //             return true;
        //           });
    }

    //gets the user data for display, parses it, and stores it
    public getUserData = (): Observable<any>=>{

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        return this._httpService.get(this._config.ApiUrl+"/users/"+this._userId, {headers:headers}).map(res=> res.json())
            .map(data=>{
                if(data==null){
                  return false;
                }
                this.user = data;
                localStorage.setItem('userData', JSON.stringify(this.user));
                return true;
            })
            .catch(error=>{
                if(error.status==400){
                    return Observable.of(error);
                }
                if(error.status==401){
                    return Observable.of(false);
                }
                else{
                    return Observable.throw(error.json().error || 'Server error'); 
                }
            });
    }



    isLoggedIn() : boolean {
        return this.token && this.user ? true : false;
    }    

    isAdmin() : boolean {
        return this.token && this.user && this.user.role==="admin";
    }


    logOut(): void {
        // clear token, remove user from local storage to log user out
        this.token = null;
        this.user = null;
        localStorage.removeItem('userData');
        localStorage.removeItem('userCredentials');
        this._router.navigate(["/login"]);
    }
}
