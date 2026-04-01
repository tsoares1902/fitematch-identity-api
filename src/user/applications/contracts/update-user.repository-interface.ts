import type { User } from './user.interface';
import type { UserRecord } from './user-record.interface';

export const UPDATE_USER_REPOSITORY = 'UPDATE_USER_REPOSITORY';

export interface UpdateUserRepositoryInterface {
  update(id: string, data: Partial<User>): Promise<UserRecord | null>;
}
