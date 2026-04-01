import type { ListUsersFilters } from './list-users-filters.interface';
import type { UserRecord } from './user-record.interface';

export const LIST_USERS_REPOSITORY = 'LIST_USERS_REPOSITORY';

export interface ListUsersRepositoryInterface {
  list(filters: ListUsersFilters): Promise<UserRecord[]>;
}
