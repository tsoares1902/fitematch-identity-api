import type { SessionClient } from '@src/auth/domains/repositories/authentication.repository';
import type {
  AdminPermissionEnum,
  AdminRoleEnum,
  ProductPermissionEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

export const LOGIN_USE_CASE = 'LOGIN_USE_CASE';

export interface LoginRequest {
  email: string;
  password: string;
  client?: SessionClient;
}

export interface LoginResponse {
  accessToken: string;
  user: {
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
  };
}

export interface LoginUseCaseInterface {
  execute(data: LoginRequest): Promise<LoginResponse>;
}
