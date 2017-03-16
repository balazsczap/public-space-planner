import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsersComponent} from "./users.component";
import { AddUserComponent } from "./add/add.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsersComponent,
    AddUserComponent,
  ]
})
export class UsersModule {}