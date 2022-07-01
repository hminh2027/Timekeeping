import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginPayload } from './payload/login.payload';
import { RegisterPayload } from './payload/register.payload';
import { UserService } from '../user/user.service';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('login')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful Login' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  
  async login(@Body() credentials: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(credentials);
    return await this.authService.generateToken(user);
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful Registration' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const user = await this.userService.create(payload);
    return await this.authService.generateToken(user);
  }

}
