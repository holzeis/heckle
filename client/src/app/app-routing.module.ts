import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { AuthGuard } from './guards/auth.guard';
import { TalksViewComponent } from './views/talks-view/talks-view.component';
import { TalkViewComponent } from './views/talk-view/talk-view.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HeckleViewComponent } from './views/heckle-view/heckle-view.component';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: '', component: TalksViewComponent, canActivate: [AuthGuard] },
  { path: 'talk/:talkId', component: TalkViewComponent, canActivate: [AuthGuard] },
  { path: 'heckle/:talkId', component: HeckleViewComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
