import { Component } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})



export class AppComponent {
  constructor(private authService: AuthenticationService, private router: Router) { 

  }

  logOut(){
    this.authService.logOut();
  }

}
