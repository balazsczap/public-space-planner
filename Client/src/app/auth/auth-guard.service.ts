import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

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