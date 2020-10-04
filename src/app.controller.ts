import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('/status')
  healthCheck(): string {
    return 'OK';
  }
}
