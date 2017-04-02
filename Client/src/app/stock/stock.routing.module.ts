import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { StockComponent } from "./stock.component";
import { UserGuard, AdminGuard } from '../auth/auth-guard.service';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
const stockRoutes: Routes = [
  {
    path: 'stock',
    component: StockComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'stock/add',
    component: AddComponent
  },
  {
    path: 'stock/:id',
    component: DetailsComponent
  },


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