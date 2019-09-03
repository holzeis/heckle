import { JsonController, Post, Param, Body, Get, NotFoundError, BadRequestError, CurrentUser } from 'routing-controllers';
import { DataService } from '../services/data.service';
import { Heckle } from '../models/heckle';
import { Message } from '../models/input/message';
import { NotificationService } from '../services/notifcation.service';
import { Talk } from '../models/talk';
import { User } from '../models/user';

@JsonController('/heckle')
export class HeckleController {

  constructor(private dataService: DataService, private notificationService: NotificationService) {}

  @Post('/:talkId')
  public async heckle(@CurrentUser({ required: true }) antendee: User, @Param('talkId') talkId: string, @Body() message: Message): Promise<Heckle> {
    const talk: Talk = await this.dataService.load([Talk.PREFIX, talkId].join('/'));
    if (talk == null) {
      throw new NotFoundError('Talk with id ' + talkId + ' not found!');
    }
    if (talk.closed) {
      throw new BadRequestError('Talk is already closed!'); 
    }
    const heckle = new Heckle(talkId, message.content, antendee);
    this.notificationService.send(talkId, talk.title, heckle.message);
    return this.dataService.persist(heckle);
  }

  @Get('/:talkId')
  public async loadHeckles(@Param('talkId') talkId: string): Promise<Heckle[]> {
    return this.dataService.loads([Heckle.PREFIX, talkId].join('/'));
  }
}