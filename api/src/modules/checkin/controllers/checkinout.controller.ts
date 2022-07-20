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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { CheckinService } from '../services/checkinout.service';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { CheckinoutPayload } from '../payloads/checkinout.payload';
import { SearchQueryDto } from '../dto/search.dto';

@Controller('checkin')
@ApiTags('check in/ check out')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER, UserRole.ADMIN)
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get()
  @ApiOperation({
    summary: '(USER only)',
    description: 'get all checkin',
  })
  async getCheckin(@ReqUser() user, @Query() data: SearchQueryDto) {
    return await this.checkinService.search(user.id, data);
  }

  @Post()
  @ApiOperation({
    summary: '(USER only)',
    description: 'check in action',
  })
  async checkin(@ReqUser() user, @Body() data: CheckinoutPayload) {
    data.userId = user.id;
    return {
      statusCode: HttpStatus.OK,
      message: 'Checked in successfully',
      data: await this.checkinService.create(data),
    };
  }

  @Patch()
  @ApiOperation({
    summary: '(USER only)',
    description: 'check out action',
  })
  async checkout(@ReqUser() user, @Body() data: CheckinoutPayload) {
    data.userId = user.id;
    return {
      statusCode: HttpStatus.OK,
      message: 'Checked out successfully',
      data: await this.checkinService.update(data),
    };
  }
}
