import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../role/role.enum';
import { SearchQueryDto } from './dto/search.dto';
import { UserPayload } from './payload/user.payload';
import { UserService } from './user.service';


@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)

export class UserController {
    constructor(
        private readonly userService: UserService,
        // private readonly contactService: ContactService
    ) {}

    @Get()
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async search(@Query() params: SearchQueryDto) {
        return await this.userService.search(params);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    
    async getUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) { 
        return await this.userService.getById(id);
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'User updated successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful Login' })
    
    async updateUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() payload: UserPayload) {
        await this.userService.update(id, payload)
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully'
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'User deleted successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    
    async deleteUser(@Param('id',  new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        await this.userService.remove(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully'
        }
    }
}
