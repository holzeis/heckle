import { JsonController, Post, Param, Body, Get } from 'routing-controllers';
import { DataService } from '../services/data.service';
import { Heckle } from '../models/heckle';
import { Message } from '../models/input/message';

@JsonController('/heckle')
export class HeckleController {

  constructor(private dataService: DataService) {}

  @Post('/:talkId')
  public async heckle(@Param('talkId') talkId: string, @Body() message: Message): Promise<Heckle> {
    const heckle = new Heckle(talkId, message.content);
    return this.dataService.persist(heckle);
  }

  @Get('/:talkId')
  public async loadHeckles(@Param('talkId') talkId: string): Promise<Heckle[]> {
    return this.dataService.loads([Heckle.PREFIX, talkId].join('/'));
  }
}