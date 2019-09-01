import { Component, OnInit } from '@angular/core';
import { TalkService } from '../services/talk.service';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { Talk } from '../models/talk';
import { Heckle } from '../models/heckle';
import { HeckleService } from '../services/heckle.service';

@Component({
  selector: 'app-talk-view',
  templateUrl: './talk-view.component.html',
  styleUrls: ['./talk-view.component.scss']
})
export class TalkViewComponent implements OnInit {

  private talkId: string;
  public talk: Talk;
  public heckles: Heckle[];

  constructor(private talkService: TalkService, private heckleService: HeckleService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.talkId = params['talkId'];

      this.talkService.loadTalk(this.talkId).pipe(take(1)).subscribe((talk: Talk) => {
        this.talk = talk;
      }, (error) => console.error(error));

      this.heckleService.loadHeckles(this.talkId).pipe(take(1)).subscribe((heckles: Heckle[]) => {
        this.heckles = heckles.sort((a,b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
      }, (error) => console.error(error));
    });
  }

  public stop() {
    this.talkService.stop(this.talkId).subscribe((talk: Talk) => {
      this.talk = talk;
    }, (error) => console.error(error));
  }

}
