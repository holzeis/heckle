import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('400ms ease-out')),
      transition('hide => show', animate('100ms ease-in'))
    ])
  ]
})
export class AlertComponent implements OnInit {

  public alert: Alert;
  private show = false;

  constructor(private alertService: AlertService) { }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  public ngOnInit() {
    this.alertService.alerts().subscribe((alert: Alert) => {
      this.alert = alert;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, alert && alert.duration || 0);

    });
  }

}
