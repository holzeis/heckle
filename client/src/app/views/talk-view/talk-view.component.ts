import { Component, OnInit } from '@angular/core';
import { TalkService } from '../../services/talk.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take, filter, map } from 'rxjs/operators';
import { Talk } from '../../models/talk';
import { Heckle } from '../../models/heckle';
import { HeckleService } from '../../services/heckle.service';
import { takeUntil } from 'rxjs/operators';
import { WebsocketService } from '../../services/websocket.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-talk-view',
  templateUrl: './talk-view.component.html',
  styleUrls: ['./talk-view.component.scss']
})
export class TalkViewComponent extends OnDestroyMixin implements OnInit {

  public user: User;

  private talkId: string;
  public talk: Talk;
  public heckles: Heckle[];

  public constructor(private websocketService: WebsocketService, private talkService: TalkService, private heckleService: HeckleService
                   , private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router
                   , private alertService: AlertService) {
      super();
      this.user = this.authenticationService.getCurrentUser();
  }

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
      }, (error) => this.alertService.error(error.message || error));

      this.heckleService.loadHeckles(this.talkId).pipe(take(1)).subscribe((heckles: Heckle[]) => {
        this.heckles = heckles.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
      }, (error) => this.alertService.error(error.message || error));
    });
  }

  public stop() {
    this.talkService.stop(this.talkId).subscribe((talk: Talk) => {
      this.talk = talk;
    }, (error) => this.alertService.error(error.message || error));
  }

  public delete() {
    this.talkService.delete(this.talkId).pipe(take(1)).subscribe(
      () => this.router.navigate(['/']),
      (error) => this.alertService.error(error.message || error));
  }

  public heckle() {
    this.router.navigate(['/heckle', this.talkId]);
  }

}
