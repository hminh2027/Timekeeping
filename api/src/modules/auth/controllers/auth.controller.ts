import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from '../payloads/login.payload';
import { RegisterPayload } from '../payloads/register.payload';
import { UserService } from '../../user/services/user.service';
import { ForgotPayload } from '../payloads/forgot.payload';
import { ResetPayload } from '../payloads/reset.payload';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { TokenQueryDto } from '../dto/token.dto';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/modules/user/entities/user.entity';
import { ReqCookie } from 'src/common/decorators/cookie.decorator';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { GoogleService } from '../services/google.service';

@Controller('auth')
@ApiTags('authentication')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly googleService: GoogleService,
  ) {}

  @Get('me')
  @ApiOperation({
    description: 'get current login users informations',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async decodingToken(@ReqUser() user: User): Promise<User> {
    return user;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.googleService.googleLogin(req);
  }

  @Post('login')
  @ApiOperation({
    description: 'user login with credentials',
  })
  async login(
    @Body() credentials: LoginPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const user = await this.authService.validateUser(credentials);
    const refreshToken = await this.authService.generateRefreshToken(user);
    res.cookie('refresh-token', refreshToken);

    return {
      accessToken: await this.authService.generateAccessToken(user),
      refreshToken,
      user,
    };
  }

  @Post('logout')
  @ApiOperation({
    description: 'user logout to revoke jwt',
  })
  async logout(@ReqUser() user: User): Promise<any> {
    // push jwt to redis to revoke it
  }

  @Post('register')
  @ApiOperation({
    description: 'user register with input',
  })
  async register(
    @Body() payload: RegisterPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Object> {
    const user = await this.userService.create(payload);
    const refreshToken = await this.authService.generateRefreshToken(user);

    res.cookie('refresh-token', refreshToken);

    return {
      accessToken: await this.authService.generateAccessToken(user),
      refreshToken,
      user,
    };
  }

  @Post('refresh')
  @ApiOperation({
    description: 'refresh the access token',
  })
  async refreshToken(@ReqCookie() token: string): Promise<Object> {
    return {
      accessToken: await this.authService.refreshToken(token),
    };
  }

  @Post('forgot')
  @ApiOperation({
    description: 'send reset password request',
  })
  async forgot(@Body() payload: ForgotPayload): Promise<Object> {
    return {
      statusCode: HttpStatus.OK,
      message: await this.authService.forgot(payload),
    };
  }

  @Post('reset')
  @ApiOperation({
    description: 'reset user password',
  })
  async reset(
    @Body() payload: ResetPayload,
    @Query() params: TokenQueryDto,
  ): Promise<Object> {
    return {
      statusCode: HttpStatus.OK,
      message: await this.authService.reset(payload, params),
    };
  }
}
