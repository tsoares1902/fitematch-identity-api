import type { UserRoleEnum } from './user-role.enum';
import type { UserStatusEnum } from './user-status.enum';

export type ListUsersSortField =
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'updatedAt';

export type ListUsersSortOrder = 'asc' | 'desc';

export interface ListUsersFilters {
  id?: string;
  role?: UserRoleEnum;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: UserStatusEnum;
  sortBy?: ListUsersSortField;
  sortOrder?: ListUsersSortOrder;
}
