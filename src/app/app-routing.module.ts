import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LetterofcreditsComponent }      from './letterofcredits/letterofcredits.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { LocDetailComponent }  from './loc-detail/loc-detail.component';



const routes: Routes = [
  { path: 'letterofcredits', component: LetterofcreditsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: LocDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
