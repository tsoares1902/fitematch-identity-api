import { SetMetadata } from '@nestjs/common';
import type { AdminPermissionEnum } from '@src/user/domains/entities/user.entity';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: AdminPermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
