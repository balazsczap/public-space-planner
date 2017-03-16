import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { User } from '../../models/user.model';
import {UserService} from '../../network/user.service';

@Component({
  selector: 'app-login-tester',
  templateUrl: './login-tester.component.html',
  styleUrls: ['./login-tester.component.less'],
  providers: [AuthenticationService]
})
export class LoginTesterComponent implements OnInit {


  _userService: UserService;


  publicdata: string;
  userdata: string;
  admindata: string;



  constructor(private userSerivce: UserService) { 

    this._userService = userSerivce;
  }

  ngOnInit() {

  }


  getUserById(){
    this._userService.getUserById(1).subscribe(data=>console.log(data));
  }


  // getPublic(){
  //   // this.users = [];
  //   this._restService.getPublic().subscribe(
  //     (data: any) => {
  //       this.publicdata= data.data;
  //       // this.users = data;
  //     },
  //     (err) => this.publicdata = err
  //   );
  // }
  getUser(){
    // this.users = [];
    this._userService.getProtected().subscribe(
      data=>this.userdata=data,
      err=>this.userdata=err
     );
  }
  // getAdmin(){
  //   // this.users = [];
  //   this._restService.getAdmin().subscribe(
  //     (data: any) => {
  //       this.admindata = data.data;
  //       // this.users = data;
  //     },
  //     (err) => this.admindata = err
  //   );
  // }

}
