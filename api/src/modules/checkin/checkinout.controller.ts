import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../user/enums/role.enum';
import { CheckinService } from './services/checkinout.service';
import { SearchQueryDto } from './dto/search.dto';
import { CheckinoutPayload } from './payloads/checkinout.payload';
import { ReqUser } from 'src/common/decorators/user.decorator';

@Controller('checkin')
@ApiTags('check in/ check out')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get()
  async getCheckin(@ReqUser() user, @Query() data: SearchQueryDto) {
    return await this.checkinService.search(user.id, data);
  }

  @Post()
  async checkin(@ReqUser() user, @Body() data: CheckinoutPayload) {
    data.userId = user.id;
    return {
      statusCode: HttpStatus.OK,
      message: 'Checked in successfully',
      data: await this.checkinService.create(data),
    };
  }

  @Patch()
  async checkout(@ReqUser() user, @Body() data: CheckinoutPayload) {
    data.userId = user.id;
    return {
      statusCode: HttpStatus.OK,
      message: 'Checked out successfully',
      data: await this.checkinService.update(data),
    };
  }
}
