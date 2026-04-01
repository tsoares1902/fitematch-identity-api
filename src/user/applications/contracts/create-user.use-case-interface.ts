import type { User } from './user.interface';
import type { UserRecord } from './user-record.interface';

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE';

export interface CreateUserUseCaseInterface {
  execute(data: User): Promise<UserRecord>;
}
