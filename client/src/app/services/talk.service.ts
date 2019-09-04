import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Talk } from '../models/talk';
import { AuthenticationService } from './authentication.service';
import { StartTalk } from '../models/input/start.talk';

@Injectable({
  providedIn: 'root'
})
export class TalkService {

  private baseUrl: string;

  public constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.baseUrl = `${environment.host}/${environment.api}/talk`;
  }

  public start(title: string): Observable<Talk> {
    return this.httpClient.post<Talk>(this.baseUrl + '/start/', new StartTalk(title, this.authenticationService.getSubscription()));
  }

  public stop(talkId: string): Observable<Talk> {
    return this.httpClient.post<Talk>(this.baseUrl + '/' + talkId + '/stop/', {});
  }

  public delete(talkId: string): Observable<Talk> {
    return this.httpClient.delete<Talk>(this.baseUrl + '/' + talkId);
  }

  public loadTalks(): Observable<Talk[]> {
    return this.httpClient.get<Talk[]>(this.baseUrl);
  }

  public loadTalk(talkId: string): Observable<Talk> {
    return this.httpClient.get<Talk>(this.baseUrl + '/' + talkId);
  }
}
