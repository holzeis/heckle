import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Heckle } from './models/heckle';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private websocketService: WebsocketService) {}

  public ngOnInit() {
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
