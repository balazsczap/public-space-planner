import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MaterialModule} from '@angular/material';
import { AppComponent } from './app.component';

import { RoutingModule } from './routing.module';

import { ConfigurationService } from './configuration/configuration.service'
import { AuthenticationService } from './auth/authentication.service'
import { RestService } from './network/rest.service';
import { NotificationsService } from './notifications/notifications.service';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { StockComponent } from './stock/stock.component';
import { MapComponent } from './map/map.component';
import { AddComponent } from './stock/add/add.component';
import { LoginComponent } from './login/login.component';
import { Notifications as NotificationsComponent } from './notifications/notifications.component';

import { LoginTesterComponent } from './users/login-tester/login-tester.component';


@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    // NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    UsersComponent,
    StockComponent,
    MapComponent,
    AddComponent,
    LoginComponent,
    NotificationsComponent,


    LoginTesterComponent
  ],
  providers: [ConfigurationService, AuthenticationService, RestService, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
