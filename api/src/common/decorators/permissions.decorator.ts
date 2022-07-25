import { SetMetadata } from '@nestjs/common';
import { UserPermission } from 'src/modules/user/enums/permission.enum';

export const PERMISSIONS_KEY = 'permission';
export const Permissions = (...permissions: UserPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
