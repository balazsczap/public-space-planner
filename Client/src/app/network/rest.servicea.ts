import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import { ConfigurationService } from "../configuration/configuration.service";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable()
export class RestService<T> {


	private headers: Headers;
	// private token: string;
	private tokenProvider: AuthenticationService;

	constructor(private _http: Http,
	 private _config: ConfigurationService
	 ) {

	    this.headers = new Headers();
	    this.headers.append('Content-Type', 'application/json');
	    this.headers.append('Accept', 'application/json');
	}


	public setTokenProvider = (serv: AuthenticationService):void => {
		this.tokenProvider = serv;
	}

	public logIn = (us: string, pw: string):Observable<T> =>{

		let headers = new Headers();

		let body = new URLSearchParams();
		body.set('username', us);
		body.set('password', pw);

		
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post("/api/auth", body, {headers:headers})
		.map(res => {
			return res.json();
		})
		.catch(error=>{
			if(error.status == 400){
				return Observable.of(error);
			}
			else{
				return Observable.throw(error.json().error || 'Server error');
			}
		})

	}


	/* test functions for demoing that auth works*/

	public getPublic=():Observable<T[]> => {
		let headers = new Headers();
		// if(this.tokenProvider==null){
		// 	return Observable.throw('Token not available');
		// }
		// headers.append('Authorization', 'Bearer ' + this.tokenProvider.token);

		return this._http.get(this._config.ApiUrl + "/test/public", {headers:headers})
			.map(res=>{console.log(res);return res.json();});
	}

	public getUser=():Observable<T[]> => {
		let headers = new Headers();

		headers.append('Authorization', 'Bearer ' + this.tokenProvider.token);

		return this._http.get(this._config.ApiUrl + "/test/user", {headers:headers})
			.map(res=>{console.log(res);return res.json();});
	}

	public getAdmin=():Observable<T[]> => {
		let headers = new Headers();

		headers.append('Authorization', 'Bearer ' + this.tokenProvider.token);

		return this._http.get(this._config.ApiUrl + "/test/admin", {headers:headers})
			.map(res=>{console.log(res);return res.json();});
	}


	/* ------------------------------------------- */


	public getUserById = (id: number): Observable<T> => {
		let headers = new Headers();
		
		headers.append('Authorization', 'Bearer ' + this.tokenProvider.token);

		return this._http.get(this._config.ApiUrl + "/users/" + id, {headers: headers})
			.map(res => res.json());
	}

	private handleError(error: Response) {
		console.log("here");
		console.log(error.json().error || 'Server error');
	    return Observable.of(error.json().error || 'Server error');
  	}
}
