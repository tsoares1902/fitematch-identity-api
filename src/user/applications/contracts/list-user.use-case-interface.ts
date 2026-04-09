import type { ListUserQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import { ResultListUserUseCaseInterface } from '@src/user/applications/contracts/result-list-user.use-case.interface';

export const LIST_USER_USE_CASE_INTERFACE = 'LIST_USER_USE_CASE_INTERFACE ';

export interface ListUserUseCaseInterface {
  execute(
    filters: ListUserQueryInterface,
  ): Promise<ResultListUserUseCaseInterface>;
}
