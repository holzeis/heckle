import { Component, OnInit, OnDestroy } from '@angular/core';
import { Talk } from '../../models/talk';
import { TalkService } from '../../services/talk.service';
import { take, takeUntil, filter, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-talks-view',
  templateUrl: './talks-view.component.html',
  styleUrls: ['./talks-view.component.scss']
})
export class TalksViewComponent implements OnInit, OnDestroy {

  public talkForm: FormGroup;
  public talks: Talk[] = [];

  constructor(private talkService: TalkService, private router: Router, private formBuilder: FormBuilder
            , private websocketService: WebsocketService) { }

  public ngOnInit() {
    this.websocketService.updates().pipe(takeUntil(componentDestroyed(this)), filter(u => u.prefix === Talk.PREFIX)
      , map(u => u.data), filter(t => !t._deleted)).subscribe((talk: Talk) => {
        const index = this.talks.findIndex(t => t.talkId === talk.talkId);
        if (index >= 0) {
          this.talks[index] = talk;
        } else {
          this.talks.unshift(talk);
        }
      });

    // handle deleted talks
    this.websocketService.updates().pipe(takeUntil(componentDestroyed(this)), filter(u => u.prefix === Talk.PREFIX)
      , map(u => u.data), filter(t => t._deleted)).subscribe((talk: Talk) => this.talks = this.talks.filter(t => t._id !== talk._id));

    this.talkForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(25)]]
    });

    this.talkService.loadTalks().pipe(take(1)).subscribe((talks: Talk[]) => {
      this.talks = talks.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
    }, (error) => console.error(error));
  }

  public start() {
    this.talkService.start(this.talkForm.value.title).subscribe((talk: Talk) => {
      this.talks.push(talk);
      this.router.navigate(talk._id.split('/'));
    }, (error) => console.error(error));
  }

  public open(talk: Talk) {
    this.router.navigate(talk._id.split('/'));
  }

  public ngOnDestroy() {}

}
