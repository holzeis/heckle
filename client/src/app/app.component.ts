import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Heckle } from './models/heckle';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public signedIn: boolean;

  constructor(private websocketService: WebsocketService, private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.signedIn = this.authenticationService.getToken() ? true : false;
    this.authenticationService.signedIn.subscribe((signedIn) => this.signedIn = signedIn);
    this.websocketService.openWebSocket();

    Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            this.websocketService.heckles().pipe(takeUntil(componentDestroyed(this))).subscribe((heckle: Heckle) => {
              const options = {
                  body: heckle.message,
              };
              const notification = new Notification('It\'s a hackle', options);
            });
        }
    });
  }

  public ngOnDestroy() {}
}
