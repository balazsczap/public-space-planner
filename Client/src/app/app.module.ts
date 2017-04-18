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

import { UsersAdminModule } from './users-admin/users.admin.module';
import { StockModule } from './stock/stock.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule }from './users/users.module';
import { MapModule } from './map/map.module';

import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile.component';


@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersModule,
    UsersAdminModule,
    StockModule,
    DashboardModule,
    MapModule,
    RoutingModule,
    NotificationsModule,
    ReactiveFormsModule
    // NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [ConfigurationService, AuthenticationService, HttpService, UserService, AdminGuard, UserGuard, SelfGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
