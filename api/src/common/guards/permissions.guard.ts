import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermission } from 'src/modules/user/enums/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { JwtAuthGuard } from './jwt.guard';

@Injectable()
export class PermissionGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const permissions = this.reflector.getAllAndOverride<UserPermission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!permissions) return true;
    const { user } = context.switchToHttp().getRequest();
    return permissions.some((pms) => user.permission === pms);
  }
}
