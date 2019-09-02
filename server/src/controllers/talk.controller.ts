import { JsonController, Post, Param, Body, Get, UseBefore, CurrentUser, UnauthorizedError } from 'routing-controllers';
import { Talk } from '../models/talk';
import { DataService } from '../services/data.service';
import { TokenAuthenticatorMiddleware } from '../middleware/token.authenticator.middleware';
import { StartTalk } from '../models/input/start.talk';
import { User } from '../models/user';
import * as webpush from 'web-push';

@JsonController('/talk')
@UseBefore(TokenAuthenticatorMiddleware)
export class TalkController {

  constructor(private dataService: DataService) {}

  @Post('/start')
  public async start(@CurrentUser() user: User, @Body() startTalk: StartTalk): Promise<Talk> {
    const talk = new Talk(startTalk.title, user);
    const payload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };
    const result = await webpush.sendNotification(startTalk.subscription, JSON.stringify(payload));
    console.log(result);
    return this.dataService.persist(talk);
  }

  @Post('/stop/:talkId')
  public async stop(@CurrentUser() user: User, @Param('talkId') talkId: string): Promise<Talk> {
      const talk: Talk = await this.dataService.load([Talk.PREFIX, talkId].join('/'));
      if (user.email !== talk.presenter.email) {
        throw new UnauthorizedError();
      }
      talk.closed = true;
      return this.dataService.persist(talk);
  }

  @Get('/')
  public async loadTalks(): Promise<Talk[]> {
    return this.dataService.loads(Talk.PREFIX);
  }

  @Get('/:talkId')
  public async loadTalk(@Param('talkId') talkId: string): Promise<Talk> {
    return this.dataService.load([Talk.PREFIX, talkId].join('/'));
  }
}
