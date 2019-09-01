import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit() {
     Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            const options = {
                body: 'Hello!',
            };
            const notification = new Notification('Test', options);
        }
    });
  }
}
