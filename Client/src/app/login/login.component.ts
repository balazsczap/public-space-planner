import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from "@angular/router";
import { NotificationsService } from "../notifications/notifications.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  un: string;
  pw: string;

  constructor(private authService: AuthenticationService,
   private router: Router,
   private notificationsService: NotificationsService) { }

  ngOnInit() {
  }


  onSubmit(){
  	this.authService.logIn(this.un, this.pw).subscribe(
  		(success:boolean)=>{
        console.log(success);
  			if(success){
  				this.router.navigate(['/']);
  			}
  			else{
  				this.notificationsService.create(this.notificationsService.TYPE.ERROR, "Wrong username or password", this.notificationsService.DURATION.MEDIUM);
  			}
      },
      (err)=>{
        this.notificationsService.create(this.notificationsService.TYPE.ERROR, err, this.notificationsService.DURATION.MEDIUM);
      }
  		
	);
  }
}
