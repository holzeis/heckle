import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public signedIn: boolean;

  constructor(private websocketService: WebsocketService, private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.signedIn = this.authenticationService.getToken() ? true : false;
    this.authenticationService.signedIn.subscribe((signedIn) => this.signedIn = signedIn);
    this.websocketService.openWebSocket();
  }
}
