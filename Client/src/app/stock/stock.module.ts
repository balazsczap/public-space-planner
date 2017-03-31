import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { StockComponent } from "./stock.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StockRoutingModule} from './stock.routing.module';
import { DetailsComponent } from './details/details.component';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule
  ],
  declarations: [
    StockComponent,
    DetailsComponent
  ]
})
export class StockModule {}