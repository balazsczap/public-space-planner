import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { UsersComponent } from "./users.component";
import { AddUserComponent } from "./add/add.component";
import { UserGuard, AdminGuard } from '../auth/auth-guard.service';

const usersRoutes: Routes = [
  {
    path: 'users_admin',
    component: UsersComponent,
    canActivate: [AdminGuard],
    children: [
        // {
        //   path: 'add', component: AddUserComponent
        // }
    ]
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