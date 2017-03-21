import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent  }   from './map/map.component';
import { StockComponent  }   from './stock/stock.component';
import { ProfileComponent } from './profile/profile.component';

import { UsersRoutes } from './users/users.routing';

import { LoginTesterComponent  }   from './users/login-tester/login-tester.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserGuard, AdminGuard, SelfGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [SelfGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard] },
  { path: 'map', component: MapComponent, canActivate: [UserGuard]  },
  { path: 'stock', component: StockComponent, canActivate: [UserGuard]  },
  ...UsersRoutes,
  // { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'authtest', component: LoginTesterComponent , canActivate: [UserGuard] },
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