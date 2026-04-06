import type { UserRecord } from './user-record.interface';
import type { User } from './user.interface';

export const UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE';

export type UpdateUserDataUseCaseInterface = Partial<User>;

export interface UpdateUserUseCaseInterface {
  execute(id: string, data: UpdateUserDataUseCaseInterface): Promise<UserRecord>;
}
