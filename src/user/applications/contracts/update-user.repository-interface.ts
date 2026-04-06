import type { UserRecord } from './user-record.interface';
import type { UpdateUserDataUseCaseInterface } from './update-user.use-case-interface';

export const UPDATE_USER_REPOSITORY = 'UPDATE_USER_REPOSITORY';

export interface UpdateUserRepositoryInterface {
  update(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<UserRecord | null>;
}
