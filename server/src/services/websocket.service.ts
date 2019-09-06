import * as WebSocket from 'ws';
import { Update } from '../models/transfer/update';

export class WebsocketService {

    private clients: WebsocketClient[] = [];

    public initialize(): WebsocketService {
        //initialize the WebSocket server instance
        const wss = new WebSocket.Server({ port: 2000 });
        wss.on('connection', (ws: WebSocket) => {
            this.register(ws);
        });
        return this
    }

    public register(ws: WebSocket) {
        const client = new WebsocketClient(ws);
        this.clients.push(client);
    }

    
    public send(update: Update) {
        // removed closed connections.
        this.clients = this.clients.filter((client) => client.ws.readyState !== WebSocket.CLOSED);

        // send update to all registered websocket clients.
        this.clients.forEach(client => {
            client.send(update);
        });
    }
}

class WebsocketClient {

    constructor(public ws: WebSocket) {
        ws.on('close', () => console.info('Websocket client closed the connection.'));
    }

    public send(update: Update) {
        if (this.ws.readyState === WebSocket.OPEN) {
            // only send notification if connection is still open.
            this.ws.send(JSON.stringify(update));
        }
    }
}
