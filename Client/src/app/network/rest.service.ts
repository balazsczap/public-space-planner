import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import { ConfigurationService } from "../configuration/configuration.service";
import { AuthenticationService } from "../auth/authentication.service"

@Injectable()
export class RestService<T> {

	private headers: Headers;

	constructor(private _http: Http,
	 private _config: ConfigurationService,
	 private _auth: AuthenticationService) {
	    this.headers = new Headers();
	    this.headers.append('Content-Type', 'application/json');
	    this.headers.append('Accept', 'application/json');
	}

	public logIn = (us: string, pw: string):Observable<T> =>{

		let headers = new Headers();

		let body = new URLSearchParams();
		body.set('username', us);
		body.set('password', pw);

		
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post("/api/auth", body, {headers:headers}).map(res => res.json());
	}

	// public getPublic=():Observable<T[]> => {
	// 	let headers = new Headers();
	// 	headers.append('Authorization', 'Bearer ' + token);

	// 	return this._http.get(this._config.ApiUrl + "/public", {headers:headers}).map(res=>res.json());
	// }

	// public getUserProtected=():Observable<T[]> => {
	// 	let headers = new Headers();
	// 	headers.append('Authorization', 'Bearer ' + token);

	// 	return this._http.get(this._config.ApiUrl + "/secure/user", {headers:headers}).map(res=>res.json());
	// }

	// public getAdminProtected=():Observable<T[]> => {
	// 	let headers = new Headers();
	// 	headers.append('Authorization', 'Bearer ' + token);

	// 	return this._http.get(this._config.ApiUrl + "/secure/admin", {headers:headers}).map(res=>res.json());
	// }

	public login = (username: string, password: string) : void => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		let body = new URLSearchParams();
		body.set('username', username);
		body.set('password', password);
		console.log(this._http.post(this._config.ApiUrl + "/auth", body, {headers:headers}).map(res => res.json()));
	}
}
