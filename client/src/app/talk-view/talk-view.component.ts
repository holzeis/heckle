import { Component, OnInit, OnDestroy } from '@angular/core';
import { TalkService } from '../services/talk.service';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { Talk } from '../models/talk';
import { Heckle } from '../models/heckle';
import { HeckleService } from '../services/heckle.service';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-talk-view',
  templateUrl: './talk-view.component.html',
  styleUrls: ['./talk-view.component.scss']
})
export class TalkViewComponent implements OnInit, OnDestroy {

  private talkId: string;
  public talk: Talk;
  public heckles: Heckle[];

  constructor(private websocketService: WebsocketService, private talkService: TalkService, private heckleService: HeckleService
            , private route: ActivatedRoute) { }

  public ngOnInit() {
    Notification.requestPermission().then((result) => {
        if (result === 'granted') {
       this.websocketService.heckles().pipe(takeUntil(componentDestroyed(this))).subscribe((heckle: Heckle) => {
              if (this.talkId !== heckle.talkId) {
                return;
              }
              let message = heckle.message;
              if (message.length > 40) {
                message = heckle.message.substr(0, 40) + '...';
              }

              this.heckles.unshift(heckle);
              const options = {
                  body: message,
              };
              const notification = new Notification('It\'s a hackle', options);
            });
        }
    });

    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.talkId = params['talkId'];

      this.talkService.loadTalk(this.talkId).pipe(take(1)).subscribe((talk: Talk) => {
        this.talk = talk;
      }, (error) => console.error(error));

      this.heckleService.loadHeckles(this.talkId).pipe(take(1)).subscribe((heckles: Heckle[]) => {
        this.heckles = heckles.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
      }, (error) => console.error(error));
    });
  }

  public stop() {
    this.talkService.stop(this.talkId).subscribe((talk: Talk) => {
      this.talk = talk;
    }, (error) => console.error(error));
  }

  public ngOnDestroy() {}

}
