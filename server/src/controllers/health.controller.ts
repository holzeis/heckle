import { JsonController, Get, OnUndefined } from 'routing-controllers';

@JsonController('/health')
export class HealthController {

  @Get('/')
  @OnUndefined(200)
  public async check(): Promise<void> {
    return undefined;
  }
}
