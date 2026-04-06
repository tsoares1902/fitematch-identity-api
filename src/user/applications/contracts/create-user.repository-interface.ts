import type { User } from './user.interface';
import type { UserRecord } from './user-record.interface';

export const CREATE_USER_REPOSITORY = 'CREATE_USER_REPOSITORY';

export interface CreateUserRepositoryInterface {
  createUser(data: User): Promise<UserRecord>;
}
