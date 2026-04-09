import { SetMetadata } from '@nestjs/common';
import type { AdminRoleEnum } from '@src/user/domains/entities/user.entity';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: AdminRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
