import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Token } from '../models/transfer/token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {

  public signedIn = new Subject<boolean>();

  private authenticationUrl: string;

  public constructor(private httpClient: HttpClient) {
    this.authenticationUrl = `${environment.host}${environment.api}`;
  }

  public login(email: string): Observable<any> {
    const url = this.authenticationUrl + '/auth/login';

    return this.httpClient.post<string>(url, { email })
      .pipe(map((token: string) => {
        if (!token) {
          // login unsuccessful if there's no token in the response
          throw new Error('Missing token in response!');
        }

        // store email and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('token', JSON.stringify(token));

        this.signedIn.next(true);
      }));
  }
  // clear token and remove user from local storage to log user out
  public logout(): void {
    this.signedIn.next(false);
    sessionStorage.removeItem('token');
  }


  public createAuthorizationHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-access-token': this.getToken(),
      'Content-Type': 'application/json',
    });
  }

  public getCurrentUser(): User {
    const token: Token = new Token(JSON.parse(atob(this.getToken().split('.')[1])));
    return new User(token.getEmail(), token.getFirstname(), token.getLastname());
  }

  public getToken(): string {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  public getSubscription(): PushSubscription {
    return JSON.parse(sessionStorage.getItem('subscription'));
  }

  public ngOnDestroy() { }
}
