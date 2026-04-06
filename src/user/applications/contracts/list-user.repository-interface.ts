import type { ListUserRequestInterface } from './list-user.request.interface';
import type { UserRecord } from './user-record.interface';

export const LIST_USER_REPOSITORY = 'LIST_USER_REPOSITORY';

export interface ListUserRepositoryInterface {
  list(filters: ListUserRequestInterface): Promise<UserRecord[]>;
}
