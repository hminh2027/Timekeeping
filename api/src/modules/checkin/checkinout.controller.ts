import { Controller, Get, Post, Body, Patch, UsePipes, UseGuards, ValidationPipe, Request, Query, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../user/enums/role.enum';
import { CheckinService } from './checkinout.service';
import { SearchQueryDto } from './dto/search.dto';
import { CheckinoutPayload } from './payloads/checkinout.payload';


@Controller('checkin')
@ApiTags('check in/ check out')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)

export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getCheckin(@Request() req, @Query() data: SearchQueryDto) {
    return await this.checkinService.search(req.user.id, data);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Checkin successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })

  async checkin(@Request() req, @Body() data: CheckinoutPayload) {
    data.userId = Number(req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Checked in successfully',
      data: await this.checkinService.create(data)
    }
  }

  @Patch()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Checkout successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })

  async checkout(@Request() req, @Body() data: CheckinoutPayload) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Checked out successfully',
      data: await this.checkinService.update(data)
    }
  }
}
