import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MaterialModule} from '@angular/material';
import { AppComponent } from './app.component';

import { RoutingModule } from './routing.module';

import { ConfigurationService } from './configuration/configuration.service'
import { AuthenticationService } from './auth/authentication.service'
import { AdminGuard, UserGuard, SelfGuard} from './auth/auth-guard.service';

import { UserService } from './network/user.service';
import { HttpService } from './network/http.service';
import { NotificationsModule } from './notifications/notifications.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersModule } from './users/users.module';

import { StockComponent } from './stock/stock.component';
import { MapComponent } from './map/map.component';
import { AddComponent } from './stock/add/add.component';
import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile.component';


@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersModule,
    RoutingModule,
    NotificationsModule,
    ReactiveFormsModule
    // NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    StockComponent,
    MapComponent,
    AddComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [ConfigurationService, AuthenticationService, HttpService, UserService, AdminGuard, UserGuard, SelfGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
