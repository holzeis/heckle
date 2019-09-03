import { Component, OnInit } from '@angular/core';
import { Talk } from '../../models/talk';
import { TalkService } from '../../services/talk.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talks-view',
  templateUrl: './talks-view.component.html',
  styleUrls: ['./talks-view.component.scss']
})
export class TalksViewComponent implements OnInit {

  public talkForm: FormGroup;
  public talks: Talk[] = [];

  constructor(private talkService: TalkService, private router: Router, private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.talkForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.talkService.loadTalks().pipe(take(1)).subscribe((talks: Talk[]) => {
      this.talks = talks;
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

  public heckle(talk: Talk) {
    this.router.navigate(['heckle', talk._id.split('/')[1]]);
  }

}
