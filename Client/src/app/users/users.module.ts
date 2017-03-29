import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersComponent} from "./users.component";
import {UsersRoutingModule} from './users.routing.module';
import { AddUserComponent } from "./add/add.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    AddUserComponent,
  ]
})
export class UsersModule {}