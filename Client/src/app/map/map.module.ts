import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from "./map.component";
import { MapAddComponent } from "./add/map-add.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from "ng2-dragula"
import { NotificationsService } from '../notifications/notifications.service';
import { MapService } from './map.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MapComponent,
    MapAddComponent
  ],
  providers: [NotificationsService, MapService]
})
export class MapModule { }