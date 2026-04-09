import { SetMetadata } from '@nestjs/common';
import type { PermissionEnum } from '@src/user/domains/entities/user.entity';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
