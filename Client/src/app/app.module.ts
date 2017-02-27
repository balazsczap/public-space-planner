import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MaterialModule} from '@angular/material';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
