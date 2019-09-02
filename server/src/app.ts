import 'reflect-metadata';

import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import * as express from 'express';
import * as cors from 'cors';

import compression = require('compression');
import { WebsocketService } from './services/websocket.service';
import { DataService } from './services/data.service';
import { Heckle } from './models/heckle';
import { AuthorizationChecker } from './authentication/authorization.checker';
import { ClientAuthenticator } from './authentication/client.authenticator';
import { Configuration } from './services/configuration';
import * as webpush from 'web-push';

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
            middlewares: [__dirname + '/middleware/*.js'],
            currentUserChecker: AuthorizationChecker.currentUser,
        });

        app.use(compression());

        console.info('[App] Initializing websocket handler.');
        const websocketService = new WebsocketService().initialize();
        Container.set(WebsocketService, websocketService);

        webpush.setVapidDetails(
            'mailto:richard.holzeis@gmail.com',
            Buffer.from(Configuration.instance().publicKey, 'base64').toString('utf8'),
            Configuration.instance().privateKey
        );

        console.info('[App] Initializing data service.');
        const dataService = await new DataService().initialize();
        dataService.register((heckle: Heckle) => {
            websocketService.send(heckle);
        })
        Container.set(DataService, dataService);
        Container.set(ClientAuthenticator, new ClientAuthenticator());

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
