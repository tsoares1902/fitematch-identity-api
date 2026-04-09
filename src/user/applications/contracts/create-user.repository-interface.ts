import type { CreateUserDataUseCaseInterface } from '@src/user/applications/contracts/create-user.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

export const CREATE_USER_REPOSITORY_INTERFACE =
  'CREATE_USER_REPOSITORY_INTERFACE';

export interface CreateUserRepositoryInterface {
  createUser(data: CreateUserDataUseCaseInterface): Promise<UserRecord>;
}
