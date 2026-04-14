import type {
  AdminPermissionEnum,
  AdminRoleEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatusEnum;
  productRole?: ProductRoleEnum;
  productPermissions?: ProductPermissionEnum[];
  adminRole?: AdminRoleEnum;
  adminPermissions?: AdminPermissionEnum[];
  permissions?: AdminPermissionEnum[];
  isInternal?: boolean;
  sessionId?: string;
  tokenVersion?: number;
}
