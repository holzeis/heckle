import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { AuthGuard } from './guards/auth.guard';
import { TalkViewComponent } from './views/talk-view/talk-view.component';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: '', component: TalkViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
