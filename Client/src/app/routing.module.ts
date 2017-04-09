import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MapComponent  }   from './map/map.component';
import { ProfileComponent } from './profile/profile.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserGuard, AdminGuard, SelfGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'login/firsttime/:token', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'map', component: MapComponent, canActivate: [UserGuard]  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}