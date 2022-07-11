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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from '../payloads/login.payload';
import { RegisterPayload } from '../payloads/register.payload';
import { UserService } from '../../user/services/user.service';
import { ForgotPayload } from '../payloads/forgot.payload';
import { ResetPayload } from '../payloads/reset.payload';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { TokenQueryDto } from '../dto/Token.dto';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/modules/user/entities/user.entity';

@Controller('auth')
@ApiTags('authentication')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async decodingToken(@ReqUser() user): Promise<User> {
    return user;
  }

  @Post('login')
  async login(@Body() credentials: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(credentials);
    return await this.authService.generateToken(user);
  }

  @Post('logout')
  async logout(@ReqUser() user): Promise<any> {
    // push jwt to redis to revoke it
  }

  @Post('register')
  async register(@Body() payload: RegisterPayload): Promise<Object> {
    const user = await this.userService.create(payload);
    return await this.authService.generateToken(user);
  }

  @Post('forgot')
  async forgot(@Body() payload: ForgotPayload): Promise<Object> {
    return {
      statusCode: HttpStatus.OK,
      message: await this.authService.forgot(payload),
    };
  }

  @Post('reset')
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
