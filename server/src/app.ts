import 'reflect-metadata';

import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import * as express from 'express';
import * as cors from 'cors';

import compression = require('compression');
import { WebsocketService } from './services/websocket.service';

class App {

    public async run(): Promise<void> {
        // initialize http server
        let app = express();

        // needed for cross resource referencing
        app.use(cors());

        // used for dependency injection
        useContainer(Container);

        // initialize routing
        useExpressServer(app, {
            defaultErrorHandler: false,
            routePrefix: '/api/v1',
            // add all constrollers in folder controllers
            controllers: [__dirname + '/controllers/*.js'],
            middlewares: [__dirname + '/middleware/*.js']
        });

        app.use(compression());

        console.info('[App] Initializing websocket handler.');
        Container.set(WebsocketService, new WebsocketService().initialize());

        app.listen(3000, '0.0.0.0', () => {
            console.info('[App] App listens on port 3000.');
        });
    }
}

process.on('unhandledRejection', (error: Error, promise: Promise<any>) => {
    console.error('Unhandled rejection', error.stack ? error.stack : error);
});

// start client application
new App().run();
