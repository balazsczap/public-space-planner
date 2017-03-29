import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { NotificationsComponent } from "./notifications.component";
import {NotificationsService} from "./notifications.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [NotificationsComponent],
  providers: [
    NotificationsService
  ]
})
export class NotificationsModule {}