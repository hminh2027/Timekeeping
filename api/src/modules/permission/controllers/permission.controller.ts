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
} from '@nestjs/common';
import { PermissionService } from '../permission.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('permission')
@ApiTags('permission')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(RolesGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('init')
  @Roles(UserRole.ADMIN)
  init() {
    return this.permissionService.init();
  }
}
