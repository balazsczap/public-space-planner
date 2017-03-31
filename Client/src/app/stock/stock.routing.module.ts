import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { StockComponent } from "./stock.component";
import { UserGuard, AdminGuard } from '../auth/auth-guard.service';
import { DetailsComponent } from './details/details.component';
const stockRoutes: Routes = [
  {
    path: 'stock',
    component: StockComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'stock/:id',
    component: DetailsComponent
  }

];

@NgModule({
  imports:[
    RouterModule.forChild(stockRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class StockRoutingModule{}