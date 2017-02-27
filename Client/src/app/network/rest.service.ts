import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class RestService<T> {

	private headers: Headers;


	constructor(private _http: Http) {
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

		return this._http.post("http://localhost:5000/api/auth", body, {headers:headers}).map(res => res.json());
	}

}
