import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WebsocketService } from './services/websocket.service';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    DashboardViewComponent
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
