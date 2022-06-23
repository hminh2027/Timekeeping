import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() req): any {
    console.log(req)
    return req;
    // return this.authService.login(req)
  }

  // @Get('protected')
  // getHello(@Body() data): string {
  //   return this.authService.getHello();
  // }
}
