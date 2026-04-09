import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@src/auth/adapters/decorators/permissions.decorator';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import {
  AdminRoleEnum,
  PermissionEnum,
} from '@src/user/domains/entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;

    if (!user) {
      return false;
    }

    if (!user.isInternal) {
      throw new ForbiddenException('internal dashboard access required');
    }

    if (user.adminRole === AdminRoleEnum.SUPER_ADMIN) {
      return true;
    }

    const userPermissions = user.permissions ?? [];
    const hasAllPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException('insufficient permissions');
    }

    return true;
  }
}
