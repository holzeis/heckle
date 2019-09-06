import { JsonController, Post, Param, Body, Get, UseBefore, CurrentUser, UnauthorizedError, Delete, NotFoundError, OnUndefined } from 'routing-controllers';
import { Talk } from '../models/talk';
import { DataService } from '../services/data.service';
import { TokenAuthenticatorMiddleware } from '../middleware/token.authenticator.middleware';
import { StartTalk } from '../models/transfer/start.talk';
import { User } from '../models/user';
import { NotificationService } from '../services/notifcation.service';
import { Heckle } from '../models/heckle';

@JsonController('/talk')
@UseBefore(TokenAuthenticatorMiddleware)
export class TalkController {

  constructor(private dataService: DataService, private notificationService: NotificationService) {}

  @Post('/start')
  public async start(@CurrentUser() presenter: User, @Body() startTalk: StartTalk): Promise<Talk> {
    const talk = new Talk(startTalk.title, presenter);
    this.notificationService.register(talk.getId(), startTalk.subscription);
    return this.dataService.persist(talk);
  }

  @Post('/:talkId/stop')
  public async stop(@CurrentUser() user: User, @Param('talkId') talkId: string): Promise<Talk> {
      const talk: Talk = await this.dataService.load([Talk.PREFIX, talkId].join('/'));
      if (user.email !== talk.presenter.email) {
        throw new UnauthorizedError();
      }
      talk.closed = true;
      this.notificationService.unregister(talkId);
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

  @Delete('/:talkId')
  @OnUndefined(200)
  public async deleteTalk(@Param('talkId') talkId: string): Promise<void> {
    const talk: Talk = await this.dataService.load([Talk.PREFIX, talkId].join('/'));
    if (!talk) {
      throw new NotFoundError();
    }
    const promises: Promise<void>[] = [];
    promises.push(this.dataService.delete(talk));

    // delete all heckles
    const heckles: Heckle[] = await this.dataService.loads([Heckle.PREFIX, talkId].join('/'));
    heckles.forEach(heckle => promises.push(this.dataService.delete(heckle)));

    await Promise.all(promises);
  }
}
