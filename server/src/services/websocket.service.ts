import * as WebSocket from 'ws';

import { Heckle } from '../models/heckle';

export class WebsocketService {

    private clients: WebsocketClient[] = [];

    public initialize(): WebsocketService {
        //initialize the WebSocket server instance
        const wss = new WebSocket.Server({ port: 2000 });
        wss.on('connection', (ws: WebSocket) => {
            console.log('opened connection');
            this.register(ws);
        });
        return this
    }

    public register(ws: WebSocket) {
        console.info('Registering websocket client');
        const client = new WebsocketClient(ws);
        this.clients.push(client);
    }

    
    public send(heckle: Heckle) {
        // removed closed connections.
        this.clients = this.clients.filter((client) => client.ws.readyState !== WebSocket.CLOSED);

        // send notification to all registered websocket clients.
        console.debug('Sending heckle to websocket clients');
        this.clients.forEach(client => {
            client.send(heckle);
        });
    }
}

class WebsocketClient {

    constructor(public ws: WebSocket) {
        ws.on('close', () => console.info('Websocket client closed the connection.'));
    }

    public send(heckle: Heckle) {
        if (this.ws.readyState === WebSocket.OPEN) {
            // only send notification if connection is still open.
            this.ws.send(JSON.stringify(heckle));
        }
    }
}
