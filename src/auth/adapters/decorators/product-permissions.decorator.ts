import { SetMetadata } from '@nestjs/common';
import type { ProductPermissionEnum } from '@src/user/domains/entities/user.entity';

export const PRODUCT_PERMISSIONS_KEY = 'product_permissions';

export const ProductPermissions = (...permissions: ProductPermissionEnum[]) =>
  SetMetadata(PRODUCT_PERMISSIONS_KEY, permissions);
