import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { AuthenticationService } from './services/authentication.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public signedIn: boolean;

  constructor(private websocketService: WebsocketService, private authenticationService: AuthenticationService
            , private swUpdate: SwUpdate, private swPush: SwPush) {}

  public async ngOnInit() {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: atob(environment.publicKey)
      }).then((subscription) => {
        sessionStorage.setItem('subscription', JSON.stringify(subscription));
      }).catch(error => console.error(error));
    }

    this.signedIn = this.authenticationService.getToken() ? true : false;
    this.authenticationService.signedIn.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });

    this.websocketService.openWebSocket();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
              window.location.reload();
          }
      });
    }
  }
}
