import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: '', component: DashboardViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
