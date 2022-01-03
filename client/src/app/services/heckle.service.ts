import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Heckle } from '../models/heckle';
import { environment } from 'src/environments/environment';
import { Message } from '../models/transfer/message';

@Injectable({
  providedIn: 'root'
})
export class HeckleService {

  private baseUrl: string;

  public constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.host}${environment.api}/heckle`;
  }

  public loadHeckles(talkId: string): Observable<Heckle[]> {
    return this.httpClient.get<Heckle[]>(this.baseUrl + '/' + talkId);
  }

  public heckle(talkId: string, message: string): Observable<Heckle> {
    return this.httpClient.post<Heckle>(this.baseUrl + '/' + talkId, new Message(message));
  }
}
