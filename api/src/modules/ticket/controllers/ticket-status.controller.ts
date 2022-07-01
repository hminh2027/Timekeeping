import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";
import { RolesGuard } from "src/common/guards/role.guard";
import { UserRole } from "../../role/role.enum";
import { CreateTicketTypePayload } from "../payloads/create-ticket-type.payload";
import { UpdateTicketTypePayload } from "../payloads/update-ticket-type.payload";
import { TicketStatusService } from "../services/ticket-status.service";

@Controller('ticket/status')
@ApiTags('ticket status')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)

export class TicketStatusController {
    constructor(private readonly ticketStatusService: TicketStatusService) {}

    @Post()
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })  
    
    async createTicket(@Body() data: CreateTicketTypePayload) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket status created successfully',
            data: await this.ticketStatusService.create(data)
        }
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Updated successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async updateTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() data: UpdateTicketTypePayload) {        
        this.ticketStatusService.update(id, data)
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket status updated successfully'
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Deleted successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async deleteTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {        
        this.ticketStatusService.remove(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket status deleted successfully'
        }
    }
}