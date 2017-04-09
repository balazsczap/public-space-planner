import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { UserGuard, AdminGuard } from '../auth/auth-guard.service';
const dashboardRoutes: Routes = [
  {
    path: 'stock',
    component: DashboardComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports:[
    RouterModule.forChild(dashboardRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class DashboardRoutingModule{}