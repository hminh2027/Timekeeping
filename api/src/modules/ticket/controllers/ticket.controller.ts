import { Request, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";
import { RolesGuard } from "src/common/guards/role.guard";
import { UserRole } from "src/modules/role/role.enum";
import { CreateTicketPayload } from "../payloads/create-ticket.payload";
import { UpdateTicketPayload } from "../payloads/update-ticket.payload";
import { TicketService } from "../services/ticket.service";

@Controller('ticket')
@ApiTags('ticket')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)

export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Roles(UserRole.ADMIN)
    @Get()
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async getAll() {
        return await this.ticketService.getAll();
    }
    
    @Post()
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async createTicket(@Request() req, @Body() data: CreateTicketPayload) {
        data.authorId = req?.user?.id;
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket created successfully',
            data: await this.ticketService.create(data)
        }
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Updated successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async updateTicket(@Request() req, @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() data: UpdateTicketPayload) {        
        data.authorId = req?.user?.id;
        this.ticketService.update(id, data)
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket updated successfully'
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Deleted successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async deleteTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {        
        this.ticketService.remove(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket deleted successfully'
        }
    }
}