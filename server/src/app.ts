import 'reflect-metadata';

import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import * as express from 'express';

import { WebsocketService } from './services/websocket.service';
import { DataService } from './services/data.service';
import { Heckle } from './models/heckle';
import { AuthorizationChecker } from './authentication/authorization.checker';
import { ClientAuthenticator } from './authentication/client.authenticator';
import { Configuration } from './services/configuration';
import * as webpush from 'web-push';
import { NotificationService } from './services/notifcation.service';
import { Update } from './models/transfer/update';
import { Talk } from './models/talk';

class App {

    public async run(): Promise<void> {
        // initialize http server
        let app = express();

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

        console.info('[App] Initializing websocket handler.');
        const websocketService = new WebsocketService().initialize();
        Container.set(WebsocketService, websocketService);

        webpush.setVapidDetails(
            'mailto:richard@holzeis.me',
            Configuration.instance().publicKey,
            Configuration.instance().privateKey
        );

        console.info('[App] Initializing data service.');
        const dataService = await new DataService().initialize();
        dataService.register((update: Update) => {
            websocketService.send(update);
        }, Talk.PREFIX, Heckle.PREFIX)
        Container.set(DataService, dataService);
        Container.set(ClientAuthenticator, new ClientAuthenticator());
        Container.set(NotificationService, new NotificationService(dataService));

        app.listen(Configuration.instance().apiPort, '0.0.0.0', () => {
            console.info('[App] App listens on port ' + Configuration.instance().apiPort + '.');
        });
    }
}

process.on('unhandledRejection', (error: Error, promise: Promise<any>) => {
    console.error('Unhandled rejection', error.stack ? error.stack : error);
});

// start client application
new App().run();
