import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { environment } from 'src/environments/environment';
import { Update } from '../models/input/update';


@Injectable({providedIn: 'root'})
export class WebsocketService implements OnDestroy {

    private socket: WebSocket;
    private subject: Subject<MessageEvent>;

    private heckle: Subject<Update> = new Subject<Update>();

    public openWebSocket(retry = false, count = 0) {
        // connect to web socket.
        console.log('connecting to web socket... (' + environment.socket + ')');

        this.socket = new WebSocket(environment.socket);
        const observable = Observable.create(
            (messageObserver: Observer<MessageEvent>) => {
                this.socket.onmessage = messageObserver.next.bind(messageObserver);
                this.socket.onerror = messageObserver.error.bind(messageObserver);
                this.socket.onclose = () => {
                    // connection has been closed.
                    if (count === 0) {
                        console.log('connection to websocket has been closed.');
                    }
                    if (count === 2) {
                        // warn user after retry did not succeed.
                        console.log('connection to websocket has been closed.');
                    }
                    if (count < 20) {
                        setTimeout(() => {
                            console.log('trying to open connection');
                            this.openWebSocket(true, count + 1);
                        }, 10000);
                    } else {
                        console.error('could not reconnect to server, stop trying.');
                    }
                };
                this.socket.onopen = () => {
                    console.log('connection has been opened.');
                    // reset retry counter to zero after successfully connecting to server.
                    count = 0;
                };
                return this.socket.close.bind(this.socket);
            }
        );
        const observer = {
            next: (data: any) => {
                if (this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify(data));
                }
            }
        };

        this.subject = Subject.create(observer, observable);

        this.subject.pipe(takeUntil(componentDestroyed(this))).subscribe(
            (message) => this.heckle.next(JSON.parse(message.data)),
            (error) => console.error('Failed to connect to the server.'));
    }

    public updates(): Observable<Update> {
        return this.heckle.asObservable();
    }

    public send(object: any) {
        this.subject.next(object);
    }

    public ngOnDestroy() { }
}
