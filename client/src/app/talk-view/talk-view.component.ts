import { Component, OnInit, OnDestroy } from '@angular/core';
import { TalkService } from '../services/talk.service';
import { ActivatedRoute, Params } from '@angular/router';
import { take, filter, map } from 'rxjs/operators';
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
    this.websocketService.updates().pipe(takeUntil(componentDestroyed(this)), filter(u => u.prefix === Heckle.PREFIX)
      , map(u => u.data), filter((heckle: Heckle) => heckle.talkId === this.talkId))
      .subscribe((heckle: Heckle) => this.heckles.unshift(heckle));

    this.websocketService.updates().pipe(takeUntil(componentDestroyed(this)), filter(u => u.prefix === Talk.PREFIX)
      , map(u => u.data), filter((talk: Talk) => talk.talkId === this.talkId)).subscribe((talk: Talk) => this.talk = talk);

    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.talkId = params.talkId;

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
