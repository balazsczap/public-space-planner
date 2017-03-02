import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MaterialModule} from '@angular/material';
import {ConfigurationService } from './configuration/configuration.service'
import { AuthenticationService } from './auth/authentication.service'
import { AppComponent } from './app.component';
import { LoginTesterComponent } from './users/login-tester/login-tester.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginTesterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
    // MaterialModule
  ],
  providers: [ConfigurationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
