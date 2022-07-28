import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../enums/role.enum';

export class AdminUserPayload {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  role?: UserRole;
}
