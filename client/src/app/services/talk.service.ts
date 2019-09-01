import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Talk } from '../models/talk';

@Injectable({
  providedIn: 'root'
})
export class TalkService {

  private baseUrl: string;

  public constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.host}/${environment.api}`;
  }

  public start(title: string): Observable<Talk> {
    return this.httpClient.post<Talk>(this.baseUrl + '/start/', title);
  }

  public stop(talkId: string): Observable<Talk> {
    return this.httpClient.post<Talk>(this.baseUrl + '/stop/' + talkId, {});
  }

  public loadTalks(): Observable<Talk[]> {
    return this.httpClient.get<Talk[]>(this.baseUrl);
  }

  public loadTalk(talkId: string): Observable<Talk> {
    return this.httpClient.get<Talk>(this.baseUrl + '/' + talkId);
  }
}
