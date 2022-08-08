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
import { RolesGuard } from 'src/common/guards/role.guard';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { CheckinService } from '../services/checkinout.service';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { CheckinoutPayload } from '../payloads/checkinout.payload';
import { SearchQueryDto } from '../dto/search.dto';
import { TicketService } from '../../ticket/services/ticket.service';
import { StatisticsQueryDto } from '../dto/statistics.dto';

@Controller('checkin')
@ApiTags('check in')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(RolesGuard)
@Roles(UserRole.USER)
export class CheckinController {
  constructor(
    private readonly checkinService: CheckinService,
    private readonly ticketService: TicketService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '(USER only)',
    description: 'get all checkin',
  })
  async getCheckin(@ReqUser() user, @Query() data: SearchQueryDto) {
    return await this.checkinService.search(user.id, data);
  }

  @Get('/statistics')
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'statistics about checkin',
  })
  @Roles(UserRole.ADMIN, UserRole.USER)
  async statistics(@Query() data: StatisticsQueryDto) {
    return {
      early: await this.checkinService.countEarly(data.range),
      late: await this.checkinService.countLate(data.range),
      absent: await this.ticketService.countAbsent(data.range),
    };
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
}
