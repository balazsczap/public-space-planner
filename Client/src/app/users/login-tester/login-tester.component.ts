import { Component, OnInit } from '@angular/core';
import { RestService } from '../../network/rest.service';
@Component({
  selector: 'app-login-tester',
  templateUrl: './login-tester.component.html',
  styleUrls: ['./login-tester.component.less'],
  providers: [RestService]
})
export class LoginTesterComponent implements OnInit {

  loggedIn: string = "";
  _restService: RestService<any>;

  un: string;
  pw: string;

  constructor(private restService: RestService<any>) { 
  	this._restService = restService;
  }

  ngOnInit() {

  }

  onSubmit(){
  	// console.log(this.un, this.pw);
  	this._restService.logIn(this.un, this.pw).subscribe(
  		(data: any) => {
  			this.loggedIn = data["access_token"];
  		},
  		(err) => console.log(err)
  	);
  }

}
