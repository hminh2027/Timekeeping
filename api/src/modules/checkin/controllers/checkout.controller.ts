import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { CheckinService } from '../services/checkinout.service';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { CheckinoutPayload } from '../payloads/checkinout.payload';

@Controller('checkout')
@ApiTags('check out')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(RolesGuard)
@Roles(UserRole.USER)
export class CheckoutController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post()
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
