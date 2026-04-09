import type {
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

export type ListUserSortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'updatedAt';

export type ListUserSortOrder = 'asc' | 'desc';

export interface ListUserQueryInterface {
  id?: string;
  productRole?: ProductRoleEnum;
  isInternal?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: UserStatusEnum;
  page?: number;
  limit?: number;
  sortBy?: ListUserSortField;
  sortOrder?: ListUserSortOrder;
}
