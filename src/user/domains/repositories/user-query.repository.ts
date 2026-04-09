import type {
  ProductRoleEnum,
  User,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

export const USER_QUERY_REPOSITORY = 'USER_QUERY_REPOSITORY';

export type UserQuerySortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'updatedAt';

export type UserQuerySortOrder = 'asc' | 'desc';

export interface UserQueryFilters {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: UserStatusEnum;
  productRole?: ProductRoleEnum;
  isInternal?: boolean;
  page?: number;
  limit?: number;
  sortBy?: UserQuerySortField;
  sortOrder?: UserQuerySortOrder;
}

export interface UserQueryResult {
  data: User[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface UserQueryRepository {
  list(filters: UserQueryFilters): Promise<UserQueryResult>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
