import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { UsersComponent } from "./users.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule} from './users.routing.module';
import { DetailsComponent } from './details/details.component';
import {NotificationsService} from '../notifications/notifications.service';
import {UserService} from '../network/user.service';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    DetailsComponent,
  ],
  providers: [UserService, NotificationsService]
})
export class UsersModule {}