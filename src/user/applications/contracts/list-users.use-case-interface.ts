import type { ListUsersFilters } from './list-users-filters.interface';
import type { UserRecord } from './user-record.interface';

export const LIST_USERS_USE_CASE = 'LIST_USERS_USE_CASE';

export interface ListUsersUseCaseInterface {
  execute(filters: ListUsersFilters): Promise<UserRecord[]>;
}
