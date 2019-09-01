import { Buffer } from 'buffer';

import { Accounts } from './accounts';

import * as scrypt from 'scrypt';
import v4 = require('uuid/v4');
import { Credentials } from '../models/credentials';
import { Configuration } from '../services/configuration';

let jwt = require('jsonwebtoken');

export class ClientAuthenticator {

    private accounts: Accounts;

    public constructor() {
        this.accounts = new Accounts();
    }

    public async authenticate(credentials: Credentials): Promise<string> {
        let accountConfig = this.accounts.findByEmail(credentials.email);

        if (accountConfig) {
            //Passwords are stored into the json file as a base64 String
            var kdfHash = new Buffer(accountConfig.password, 'base64');
            var userPassword = new Buffer(credentials.password);
            var verify = scrypt.verifyKdfSync(kdfHash, userPassword);
        }

        if (!accountConfig || !verify) {
            return Promise.reject(new Error('invalid email or password'));
        }

        return Promise.resolve(this.createToken(accountConfig));
    }

    private createToken(accountConfig: any): string {
        // create a token
        let tokenPayload = {
            email: accountConfig.email,
            firstname: accountConfig.firstname,
            lastname: accountConfig.lastname,
            socketKey: v4(),

        };
        let token = jwt.sign(tokenPayload, Configuration.instance().secret, {
            expiresIn: '365d' // expires in 1 year
        });

        return token;
    }
}
