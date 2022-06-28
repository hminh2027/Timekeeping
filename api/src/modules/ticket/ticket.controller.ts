import { Request, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRole } from "../role/role.enum";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { TicketService } from "./ticket.service";

@Controller('api/ticket')
@UsePipes(ValidationPipe)
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    /* GET request to get all tickets */
    @Get()
    async getAll() {
        return await this.ticketService.getAll();
    }

    /* POST request to create a new ticket
    @Role: for user only
    @Guard: must be authenticated
    @Body: ticket's data
    @Request: get id of user
    */
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createTicket(@Request() req, @Body() data: CreateTicketDto) {
        data.authorId = req?.user?.id;
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket created successfully',
            data: await this.ticketService.create(data)
        }
    }

    /* PATCH request to update a ticket
    @Role: for user only
    @Guard: must be authenticated
    @Body: ticket's data
    @Request: get id of user
    @Param: targeted id of ticket
    */
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    async updateTicket(@Request() req, @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() data: UpdateTicketDto) {        
        data.authorId = req?.user?.id;
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket updated successfully',
            data: await this.ticketService.update(id, data)
        }
    }

    /* DELETE request to delete a ticket
    @Role: for user only
    @Guard: must be authenticated
    @Param: targeted id of ticket
    */
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {        
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket deleted successfully',
            data: await this.ticketService.remove(id)
        }
    }
}