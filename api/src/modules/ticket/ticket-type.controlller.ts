import { Request, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRole } from "../role/role.enum";
import { CreateTicketTypeDto } from "./dto/create-ticket-type.dto";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketTypeDto } from "./dto/update-ticket-type.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { TicketTypeService } from "./ticket-type.service";

@Controller('api/ticket-type')
@UsePipes(ValidationPipe)
export class TicketTypeController {
    constructor(private readonly ticketTypeService: TicketTypeService) {}

    /* GET request to get all ticket types */
    @Get()
    async getAll() {
        return await this.ticketTypeService.getAll();
    }

    /* POST request to create a new ticket type
    @Role: for user only
    @Guard: must be authenticated
    @Body: ticket type's data
    */
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createTicket(@Body() data: CreateTicketTypeDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket type created successfully',
            data: await this.ticketTypeService.create(data)
        }
    }

    /* PATCH request to update a ticket type
    @Role: for user only
    @Guard: must be authenticated
    @Body: ticket  type's data
    @Param: targeted id of ticket type
    */
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    async updateTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() data: UpdateTicketTypeDto) {        
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket type updated successfully',
            data: await this.ticketTypeService.update(id, data)
        }
    }

    /* DELETE request to delete a ticket type
    @Role: for user only
    @Guard: must be authenticated
    @Param: targeted id of ticket type
    */
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {        
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket type deleted successfully',
            data: await this.ticketTypeService.remove(id)
        }
    }
}