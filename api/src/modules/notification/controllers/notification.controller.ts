import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/modules/user/entities/user.entity';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
@ApiTags('notification')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({
    description: 'get all notifications by user id',
  })
  async getAllByRecipientId(@ReqUser() user: User) {
    return this.notificationService.getByRecipientId(user.id);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'mark is read a notification',
  })
  async updateReadNotification(@Param('id') id: number, @ReqUser() user: User) {
    return this.notificationService.updateReadNotification(id, user.id);
  }

  // @Delete(':id')
  // @ApiOperation({
  //   description: 'delete a comment by id',
  // })
  // async remove(
  //   @ReqUser() user: User,
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   return this.notificationService.remove(id, user.id);
  // }
}
