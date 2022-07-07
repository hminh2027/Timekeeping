import { Controller, Body, Post, HttpStatus, Query, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginPayload } from './payload/login.payload';
import { RegisterPayload } from './payload/register.payload';
import { UserService } from '../user/user.service';
import { ForgotPayload } from './payload/forgot.payload';
import { ResetPayload } from './payload/reset.payload';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('me')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful verify token' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  
  async decodingToken(@Body() token: string): Promise<any> {
    return await this.authService.decodingToken(token);
  }

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

  @Post('forgot')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful sent reset email' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  
  async forgot(@Body() payload: ForgotPayload): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      message: await this.authService.forgot(payload)
    }
  }

  @Post('reset')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful reset password reset' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  
  async reset(@Body() payload: ResetPayload, @Query('token') token: string): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      message: await this.authService.reset(payload, token)
    }
  }
}
