import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  @Render('login')
  get() {
    return { message: 'Hello World for my app' };
  }
}
