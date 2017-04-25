import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { MapComponent } from "./map.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from "ng2-dragula"
import { NotificationsService } from '../notifications/notifications.service';
import { DragSlotDirective } from "./drag/drag-slot.directive";
import { DragItemDirective } from "./drag/drag-item.directive";
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    DragulaModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MapComponent,
    DragSlotDirective,
    DragItemDirective
  ],
  providers: [NotificationsService]
})
export class MapModule {}