import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import { ConfigurationService } from "../configuration/configuration.service";
import { AuthenticationService } from "../auth/authentication.service";

@Injectable()
export class HttpService<T> {


	constructor(private _http: Http,
	 private _config: ConfigurationService,
	 private _auth: AuthenticationService
	 ) {

	}

	private createHeaders = (): Headers => {
		let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    headers.append('Accept', 'application/json');
	    return headers;
	}

	private createAuthHeaders=(): Headers => {
		let headers = this.createHeaders();
		headers.append('Authorization', 'Bearer ' + this._auth.token);
		return headers;
	}


	public get = (url: string) : Observable<Response> =>{
		let headers = this.createAuthHeaders();
		return this._http.get(this._config.ApiUrl + url, {headers:headers})
			.catch(this.handleError);
	}

	public post = (url: string, body: any) : Observable<Response> =>{
		let headers = this.createAuthHeaders();
		return this._http.post(this._config.ApiUrl + url, body, {headers:headers})
				.catch(this.handleError);
	}

	public put = (url: string, body:any): Observable<Response> =>{
		let headers = this.createAuthHeaders();
		return this._http.put(this._config.ApiUrl + url, body, {headers:headers})
				// .map(data=>{console.log(data); return data;})
				.catch(this.handleError);
	}

	public delete = (url:string) : Observable<Response> => {
		let headers = this.createAuthHeaders();
		return this ._http.delete(this._config.ApiUrl + url, {headers:headers})
			.catch(this.handleError);
	}

   private handleError = (error: Response): Observable<Response> => {
		if(error.status==401){
			this._auth.logOut();
			return Observable.throw("Authorization token expired");
		}
		else if(error.status==504){
			return Observable.throw("Server in not available");
		}
    	return Observable.throw(error.json().error || 'Server error');
   }
}
