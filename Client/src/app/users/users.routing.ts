import { Routes, RouterModule }  from '@angular/router';
import { UsersComponent } from "./users.component";
import { AddUserComponent } from "./add/add.component";
import { UserGuard, AdminGuard } from '../auth/auth-guard.service';

export const UsersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    children: [
        // {
        //   path: 'add', component: AddUserComponent
        // }
    ]
  }
];