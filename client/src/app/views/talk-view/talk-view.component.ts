import { Component, OnInit } from '@angular/core';
import { Talk } from '../../models/talk';

@Component({
  selector: 'app-talk-view',
  templateUrl: './talk-view.component.html',
  styleUrls: ['./talk-view.component.scss']
})
export class TalkViewComponent implements OnInit {

  public talks: Talk[] = [];

  constructor() { }

  public ngOnInit() {
  }

}
