import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { RestService } from '../../network/rest.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-tester',
  templateUrl: './login-tester.component.html',
  styleUrls: ['./login-tester.component.less'],
  providers: [AuthenticationService]
})
export class LoginTesterComponent implements OnInit {

  _authService: AuthenticationService;
  _restService: RestService<User>;

  un: string;
  pw: string;

  publicdata: string;
  userdata: string;
  admindata: string;

  user: User = null;

  constructor(private authService: AuthenticationService, private restService: RestService<User>) { 
    this._authService = authService;
  	this._restService = restService;
    if(this._authService.isLoggedIn())
      this.getUserData();
  }

  ngOnInit() {

  }

  onSubmit(){
  	// console.log(this.un, this.pw);
  	this._authService.logIn(this.un, this.pw).subscribe(
  		(success: any) => {
        console.log(success);
  			if(success) {
          this.getUserData();
          // this._authService.getLoggedIn().subscribe(user=> this.user = user);
          // console.log("user logged in");
        }
        else console.log("login failed");
  		},
  		(err) => console.log(err)
  	);
    
  }

  getUserData(){
    this._restService.getUserById(this._authService._userId).subscribe(user=>this.user=user);
  }

  logOut(){
    this._authService.logOut();
    this.user = null;
  }

  getPublic(){
    // this.users = [];
    this._restService.getPublic().subscribe(
      (data: any) => {
        this.publicdata= data.data;
        // this.users = data;
      },
      (err) => this.publicdata = err
    );
  }
  getUser(){
    // this.users = [];
    this._restService.getUser().subscribe(
      (data: any) => {
        this.userdata = data.data;
        // this.users = data;
      },
      (err) => this.userdata = err
    );
  }
  getAdmin(){
    // this.users = [];
    this._restService.getAdmin().subscribe(
      (data: any) => {
        this.admindata = data.data;
        // this.users = data;
      },
      (err) => this.admindata = err
    );
  }

}
