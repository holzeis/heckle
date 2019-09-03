import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeckleService } from '../../services/heckle.service';
import { TalkService } from '../../services/talk.service';
import { take } from 'rxjs/operators';
import { Talk } from '../../models/talk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Heckle } from '../../models/heckle';

@Component({
  selector: 'app-heckle-view',
  templateUrl: './heckle-view.component.html',
  styleUrls: ['./heckle-view.component.scss']
})
export class HeckleViewComponent implements OnInit {

  private talkId: string;
  public talk: Talk;

  public heckleForm: FormGroup;

  constructor(private talkService: TalkService, private heckleService: HeckleService, private route: ActivatedRoute
            , private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.heckleForm = this.formBuilder.group({
      message: ['', Validators.required, Validators.maxLength(500)]
    });

    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.talkId = params.talkId;

      this.talkService.loadTalk(this.talkId).pipe(take(1)).subscribe((talk: Talk) => {
        this.talk = talk;
      }, (error) => console.error(error));
    });
  }

  public heckle() {
    this.heckleService.heckle(this.talkId, this.heckleForm.value.message).subscribe((heckle: Heckle) => {
      console.log('Successfully heckled!');
    }, (error) => console.error(error));
  }

}
