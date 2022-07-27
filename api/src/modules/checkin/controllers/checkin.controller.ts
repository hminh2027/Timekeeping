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

@Controller('checkin')
@ApiTags('check in')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(RolesGuard)
@Roles(UserRole.USER)
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
}
