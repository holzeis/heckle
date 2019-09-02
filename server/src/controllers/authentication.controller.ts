import { JsonController, Post, Body, UnauthorizedError } from 'routing-controllers';
import { ClientAuthenticator } from '../authentication/client.authenticator';
import { Credentials } from '../models/input/credentials';

@JsonController('/auth')
export class AuthenticationController {

  public constructor(private clientAuthenticator: ClientAuthenticator) {}

  @Post('/login')
  public async login(@Body() credentials: Credentials): Promise<string> {
    console.debug('authenticating ' + credentials.email);

    return this.clientAuthenticator.authenticate(credentials)
      .then((token) => Promise.resolve(token))
      .catch((error: Error) => Promise.reject(new UnauthorizedError(error.message)));
  }
}
