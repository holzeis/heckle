import * as jwt from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { Request } from 'express';

import { Token } from '../models/input/token';
import { User } from '../models/user';

export class AuthorizationChecker {

    public static currentUser(action: Action): User {
        let token: Token = new Token(jwt.decode(AuthorizationChecker.getTokenFromRequest(action.request)));
        return new User(token.getEmail(), token.getFirstname(), token.getLastname());
    }

    public static getTokenFromRequest(request: Request): string | string[] {
        let token = request.headers['x-access-token'];
        if (!token) {
            token = request.body ? request.body.token : null;
        }
        if (!token) {
            token = request.query ? request.query.token : null;
        }

        return token;
    }
}
