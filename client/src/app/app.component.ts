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
    this.signedIn = this.authenticationService.getToken() ? true : false;
    if (this.signedIn && !sessionStorage.getItem('subscription')) {
      this.subscribe();
    }
    this.authenticationService.signedIn.subscribe((signedIn) => {
      this.signedIn = signedIn;
      if (this.signedIn && !sessionStorage.getItem('subscription')) {
        this.subscribe();
      }
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

  private async subscribe() {
    if (!this.swPush.isEnabled)  {
      return;
    }

    this.swPush.notificationClicks.subscribe((payload: any) => {
        const url = `${environment.host}/talk/${payload.notification.data.talkId}`;
        window.open(url);
      });

    this.swPush.subscription.subscribe(async (subscription: PushSubscription) => {
      if (!subscription) {
        // register if subscription is not existing.
        subscription = await this.swPush.requestSubscription({
          serverPublicKey: atob(environment.publicKey)
        });
      }

      sessionStorage.setItem('subscription', JSON.stringify(subscription));
    });
  }
}
