import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRODUCT_PERMISSIONS_KEY } from '@src/auth/adapters/decorators/product-permissions.decorator';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import {
  PRODUCT_ROLE_PERMISSIONS,
  type ProductPermissionEnum,
} from '@src/user/domains/entities/user.entity';

@Injectable()
export class ProductPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      ProductPermissionEnum[]
    >(PRODUCT_PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

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

    const rolePermissions = user.productRole
      ? (PRODUCT_ROLE_PERMISSIONS[user.productRole] ?? [])
      : [];
    const explicitPermissions = user.productPermissions ?? [];
    const grantedPermissions = new Set<ProductPermissionEnum>([
      ...rolePermissions,
      ...explicitPermissions,
    ]);

    const hasAllPermissions = requiredPermissions.every((permission) =>
      grantedPermissions.has(permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException('insufficient product permissions');
    }

    return true;
  }
}
