import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../enums/role.enum';
import { SearchQueryDto } from '../dto/search.dto';
import { UserService } from '../services/user.service';
import { UserPayload } from '../payload/user.payload';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async search(@Query() params: SearchQueryDto) {
    return await this.userService.search(params);
  }

  @Get('/role')
  async getRoles() {
    return this.userService.getRole();
  }

  @Get('/admin')
  async getAdmin() {
    return this.userService.getAdmin();
  }

  @Get(':id')
  async getUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.userService.getById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() payload: UserPayload,
  ): Promise<Object> {
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: await this.userService.update(id, payload),
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    await this.userService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
