import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { StockComponent } from "./stock.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StockRoutingModule} from './stock.routing.module';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import {NotificationsService} from '../notifications/notifications.service';
import {StockService} from '../network/stock.service';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule
  ],
  declarations: [
    StockComponent,
    DetailsComponent,
    AddComponent
  ],
  providers: [StockService, NotificationsService]
})
export class StockModule {}