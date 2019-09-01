import { JsonController, Post, Param, Body, Get, UseBefore } from 'routing-controllers';
import { Talk } from '../models/talk';
import { DataService } from '../services/data.service';
import { TokenAuthenticatorMiddleware } from '../middleware/token.authenticator.middleware';
import { Message } from '../models/input/message';

@JsonController('/talk')
@UseBefore(TokenAuthenticatorMiddleware)
export class TalkController {

  constructor(private dataService: DataService) {}

  @Post('/start')
  public async start(@Body() title: Message): Promise<Talk> {
    const talk = new Talk(title.content)
    return this.dataService.persist(talk);
  }

  @Post('/stop/:talkId')
  public async stop(@Param('talkId') talkId: string): Promise<Talk> {
      const talk: Talk = await this.dataService.load(talkId);
      talk.closed = true;
      return this.dataService.persist(talk);
  }

  @Get('/')
  public async loadTalks(): Promise<Talk[]> {
    return this.dataService.loads(Talk.PREFIX);
  }

  @Get('/:talkId')
  public async loadTalk(@Param('talkId') talkId: string): Promise<Talk> {
    return this.dataService.load(talkId);
  }
}
