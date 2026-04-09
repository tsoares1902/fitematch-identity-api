import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@src/auth/adapters/decorators/roles.decorator';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import { AdminRoleEnum } from '@src/user/domains/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
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

    if (!user.adminRole) {
      throw new ForbiddenException('admin role required');
    }

    const userRank = this.getRoleRank(user.adminRole);
    const hasRequiredRole = requiredRoles.some(
      (role) => userRank >= this.getRoleRank(role),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException('insufficient admin role');
    }

    return true;
  }

  private getRoleRank(role: AdminRoleEnum): number {
    switch (role) {
      case AdminRoleEnum.SUPER_ADMIN:
        return 3;
      case AdminRoleEnum.ADMIN:
        return 2;
      case AdminRoleEnum.STAFF:
        return 1;
      default:
        return 0;
    }
  }
}
