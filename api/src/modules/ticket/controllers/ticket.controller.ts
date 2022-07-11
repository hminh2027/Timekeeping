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
import { ReqUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
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
  @Roles(UserRole.ADMIN)
  async getAll() {
    return await this.ticketService.getAll();
  }

  @Get('/type')
  async getTicketType() {
    return await this.ticketService.getTicketType();
  }

  @Get(':id')
  async getAllById(@Request() req) {
    return await this.ticketService.getByUserId(req.user.id);
  }

  @Post()
  async createTicket(@ReqUser() user, @Body() data: CreateTicketPayload) {
    data.authorId = user.id;
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket created successfully',
      data: await this.ticketService.create(data),
    };
  }

  @Patch(':id')
  async updateTicket(
    @Request() req,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() data: UpdateTicketPayload,
  ) {
    data.authorId = req?.user?.id;
    this.ticketService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ticket updated successfully',
    };
  }

  @Patch(':id/cancel')
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
