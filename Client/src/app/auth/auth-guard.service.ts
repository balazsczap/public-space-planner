import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private authService: AuthenticationService) {}

  canActivate() {
    return this.authService.isLoggedIn();
  }
}

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService) {}

  canActivate() {
    return this.authService.isAdmin();
  }
}

@Injectable()
export class SelfGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	if(this.authService._userId == route.params["id"]){
  		return true;
  	}
  	this.router.navigate(['/dashboard']);
  	return false;
  }
}