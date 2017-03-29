import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { StockComponent } from "./stock.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    StockComponent
  ]
})
export class StockModule {}