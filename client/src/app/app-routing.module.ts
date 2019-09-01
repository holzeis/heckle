import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { AuthGuard } from './guards/auth.guard';
import { TalksViewComponent } from './views/talks-view/talks-view.component';
import { TalkViewComponent } from './talk-view/talk-view.component';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: '', component: TalksViewComponent, canActivate: [AuthGuard],
    children: [
      { path: 'talk', canActivate: [AuthGuard], children: [
        { path: ':talkId', component: TalkViewComponent }
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
