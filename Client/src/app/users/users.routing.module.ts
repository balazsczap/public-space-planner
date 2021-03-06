import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { UsersComponent } from "./users.component";
import { UserGuard, AdminGuard } from '../auth/auth-guard.service';
import { DetailsComponent } from './details/details.component';

const usersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'users/:id',
    component: DetailsComponent,
    canActivate: [UserGuard]
  }


];

@NgModule({
  imports:[
    RouterModule.forChild(usersRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class UsersRoutingModule{}