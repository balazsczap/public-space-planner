import { Component, OnInit } from '@angular/core';
import { RestService } from '../../network/rest.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-tester',
  templateUrl: './login-tester.component.html',
  styleUrls: ['./login-tester.component.less'],
  providers: [RestService]
})
export class LoginTesterComponent implements OnInit {

  token: string = "";
  _restService: RestService<any>;

  users: User[];

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
  			this.token = data["access_token"];
  		},
  		(err) => console.log(err)
  	);
  }

  getPublic(){
    this.users = [];
    this._restService.login("asd", "asd");
    // this._restService.getPublic().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.users = data;
    //   },
    //   (err) => console.log(err)
    // );
  }

}
