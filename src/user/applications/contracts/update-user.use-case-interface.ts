import type { User } from './user.interface';
import type { UserRecord } from './user-record.interface';

export const UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE';

export interface UpdateUserUseCaseInterface {
  execute(id: string, data: Partial<User>): Promise<UserRecord>;
}
