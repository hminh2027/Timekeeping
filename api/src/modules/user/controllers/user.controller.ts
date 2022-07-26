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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../enums/role.enum';
import { SearchQueryDto } from '../dto/search.dto';
import { UserService } from '../services/user.service';
import { UserPayload } from '../payload/user.payload';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { User } from '../entities/user.entity';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'get all users information',
  })
  @Roles(UserRole.ADMIN)
  async search(@Query() params: SearchQueryDto) {
    return await this.userService.search(params);
  }

  @Get('/admin')
  @ApiOperation({
    description: 'get all admin users information',
  })
  async getAdmin() {
    return this.userService.getAdmin();
  }

  @Get(':id')
  @ApiOperation({
    description: 'get a users information by id',
  })
  async getUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.userService.getById(id);
  }

  @Patch()
  @ApiOperation({
    summary: '(USER only)',
    description: 'update current user information',
  })
  @Roles(UserRole.USER)
  async updateOwnUser(
    @ReqUser()
    user: User,
    @Body() payload: UserPayload,
  ): Promise<Object> {
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: await this.userService.update(user.id, payload),
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'update a users information',
  })
  @Roles(UserRole.ADMIN)
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
  @ApiOperation({
    summary: '(ADMIN only)',
    description: 'delete a users',
  })
  @Roles(UserRole.ADMIN)
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
