import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WebsocketService } from './services/websocket.service';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { TalksViewComponent } from './views/talks-view/talks-view.component';
import { TalkService } from './services/talk.service';
import { TalkViewComponent } from './views/talk-view/talk-view.component';
import { Interceptors } from './interceptors/index';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HeckleViewComponent } from './views/heckle-view/heckle-view.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    TalksViewComponent,
    TalkViewComponent,
    NotFoundComponent,
    HeckleViewComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('service-worker.js', { enabled: environment.production })
  ],
  providers: [
    WebsocketService,
    AuthenticationService,
    TalkService,
    Interceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
