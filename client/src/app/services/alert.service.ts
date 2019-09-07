import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();

  constructor(router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // clear alert
        this.subject.next();
      }
    });
  }

  public success(message: string, duration = 1000) {
    this.subject.next({ message, type: 'success', duration });
  }

  public error(message: string, duration = 5000) {
    this.subject.next({ message, type: 'danger', duration });
  }

  public info(message: string, duration = 3000) {
    this.subject.next({ message, type: 'info', duration });
  }

  public warning(message: string, duration = 3000) {
    this.subject.next({ message, type: 'warning', duration });
  }

  public alerts(): Observable<Alert> {
    return this.subject.asObservable();
  }
}
