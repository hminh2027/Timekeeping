import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolePayload } from '../payloads/role.payload';
import { RoleService } from '../services/role.service';

@Controller('role')
// @ApiTags('role')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    description: 'create new role',
  })
  async create(@Body() data: RolePayload) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Create new role successfully',
      data: await this.roleService.create(data),
    };
  }

  @Get()
  @ApiOperation({
    description: 'get all roles',
  })
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Fetch roles successfully',
      data: await this.roleService.findAll(),
    };
  }

  @Patch(':id')
  @ApiOperation({
    description: 'update a role',
  })
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() data: RolePayload,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Updated role successfully',
      data: await this.roleService.update(id, data),
    };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'delete a row',
  })
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    await this.roleService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted role successfully',
    };
  }
}
