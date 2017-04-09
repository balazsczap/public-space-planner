import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module';
import {NotificationsService} from '../notifications/notifications.service';
import { EventsService } from '../network/events.service';
import { UserService } from '../network/user.service';
import { StockService } from '../network/stock.service';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [EventsService, StockService, UserService, NotificationsService]
})
export class DashboardModule {}