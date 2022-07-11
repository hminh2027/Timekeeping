import {
  Request,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { LoginHistoryPayload } from '../payloads/login-history.payload';
import { LoginHistoryService } from '../services/login-history.service';

@Controller('login/history')
@ApiTags('login history')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class LoginHistoryController {
  constructor(private readonly loginHistoryService: LoginHistoryService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Post successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(UserRole.USER)
  async create(@Body() data: LoginHistoryPayload) {
    return await this.loginHistoryService.create(data);
  }
}
