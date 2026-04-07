import type { ListUsersQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import { ResultListUserUseCaseInterface } from '@src/user/applications/contracts/result-list-user.use-case.interface';

export const LIST_USERS_USE_CASE_INTERFACE = 'LIST_USERS_USE_CASE_INTERFACE ';

export interface ListUsersUseCaseInterface {
  execute(
    filters: ListUsersQueryInterface,
  ): Promise<ResultListUserUseCaseInterface>;
}
