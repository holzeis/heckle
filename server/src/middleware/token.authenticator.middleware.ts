import * as jwt from 'jsonwebtoken';

import { ExpressMiddlewareInterface } from 'routing-controllers';

import { AuthorizationChecker } from '../authentication/authorization.checker';
import { Configuration } from '../services/configuration';

export class TokenAuthenticatorMiddleware implements ExpressMiddlewareInterface {

    public use(request: any, response: any, next?: (err?: any) => any): any {
        let token = AuthorizationChecker.getTokenFromRequest(request);
        
        // decode token
        if (token) {
            console.debug('verifying token.');
            // verifies secret and checks exp
            jwt.verify(token, Configuration.instance().secret, (err, decoded) => {
                if (err) {
                    console.error('authentication token has been rejected.');
                    return response.status(401).send('Failed to authenticate token.');
                } else {
                    console.debug('authentication token has been accepted.');
                    return next();
                }
            });
        } else {
            // if there is no token, return an error
            return response.status(401).send('No token provided.');
        }
    }
}

