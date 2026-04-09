import type { ListUserQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

export const LIST_USER_REPOSITORY_INTERFACE = 'LIST_USER_REPOSITORY_INTERFACE';

export interface ListUserRepositoryResultInterface {
  data: UserRecord[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface ListUserRepositoryInterface {
  list(
    filters: ListUserQueryInterface,
  ): Promise<ListUserRepositoryResultInterface>;
}
