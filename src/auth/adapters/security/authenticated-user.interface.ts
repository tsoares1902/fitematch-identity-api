import type {
  AdminRoleEnum,
  PermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatusEnum;
  productRole?: ProductRoleEnum;
  adminRole?: AdminRoleEnum;
  permissions?: PermissionEnum[];
  isInternal?: boolean;
  sessionId?: string;
  tokenVersion?: number;
}
