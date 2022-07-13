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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { CreateTicketPayload } from '../payloads/create-ticket.payload';
import { UpdateTicketPayload } from '../payloads/update-ticket.payload';
import { TicketService } from '../services/ticket.service';

@Controller('ticket')
@ApiTags('ticket')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'get all tickets',
  })
  @Roles(UserRole.ADMIN)
  async getAll() {
    return await this.ticketService.getAll();
  }

  @Get('/type')
  @ApiOperation({
    description: 'get all tickets type',
  })
  async getTicketType() {
    return await this.ticketService.getTicketType();
  }

  @Get('/me')
  @ApiOperation({
    description: 'get all tickets of current user',
  })
  async getAllByUserId(@ReqUser() user: User): Promise<any> {
    return await this.ticketService.getByUserId(user.id);
  }

  @Get(':id')
  @ApiOperation({
    description: 'get ticket details by ticket id',
  })
  @Roles(UserRole.ADMIN, UserRole.USER)
  async getByTicketId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<any> {
    return await this.ticketService.getByTicketId(id);
  }
  @Post()
  @ApiOperation({
    description: 'create ticket',
  })
  async createTicket(
    @ReqUser() user: User,
    @Body() data: CreateTicketPayload,
  ): Promise<Object> {
    data.authorId = user.id;
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket created successfully',
      data: await this.ticketService.create(data),
    };
  }

  @Patch(':id')
  @ApiOperation({
    description: 'update ticket',
  })
  async updateTicket(
    @ReqUser() user: User,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() data: UpdateTicketPayload,
  ) {
    data.authorId = user.id;
    this.ticketService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket updated successfully',
    };
  }

  @Patch(':id/cancel')
  @ApiOperation({
    description: 'cancel ticket',
  })
  async cancelTicket(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket cancelled successfully',
      data: await this.ticketService.update(id, {
        ticketStatus: TicketStatus.CANCELLED,
      }),
    };
  }

  @Patch(':id/reject')
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'reject ticket',
  })
  @Roles(UserRole.ADMIN)
  async rejectTicket(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket rejected successfully',
      data: await this.ticketService.update(id, {
        ticketStatus: TicketStatus.REJECTED,
      }),
    };
  }

  @Patch(':id/approve')
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'approve ticket',
  })
  @Roles(UserRole.ADMIN)
  async approveTicket(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket approved successfully',
      data: await this.ticketService.update(id, {
        ticketStatus: TicketStatus.APPROVED,
      }),
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'delete ticket',
  })
  @Roles(UserRole.ADMIN)
  async deleteTicket(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    this.ticketService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket deleted successfully',
    };
  }
}
