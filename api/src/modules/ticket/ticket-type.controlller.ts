import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";
import { RolesGuard } from "src/common/guards/role.guard";
import { UserRole } from "../../../../api/src/modules/role/role.enum";
import { CreateTicketTypePayload } from "./payload/create-ticket-type.payload";
import { UpdateTicketTypePayload } from "./payload/update-ticket-type.payload";
import { TicketTypeService } from "./ticket-type.service";

@Controller('ticket/type')
@ApiTags('ticket type')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)

export class TicketTypeController {
    constructor(private readonly ticketTypeService: TicketTypeService) {}

    @Post()
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })  
    
    async createTicket(@Body() data: CreateTicketTypePayload) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket type created successfully',
            data: await this.ticketTypeService.create(data)
        }
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Updated successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async updateTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() data: UpdateTicketTypePayload) {        
        this.ticketTypeService.update(id, data)
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket type updated successfully'
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Deleted successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async deleteTicket(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {        
        this.ticketTypeService.remove(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket type deleted successfully'
        }
    }
}