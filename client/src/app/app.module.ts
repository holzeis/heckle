import { BrowserModule } from '@angular/platform-browser';
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
import { TalkViewComponent } from './views/talk-view/talk-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    TalkViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    WebsocketService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
