import type { User } from './user.interface';
import type { UserRecord } from './user-record.interface';

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE';

export interface CreateUserDataUseCaseInterface {
  role: User['role'];
  isPaidMembership?: User['isPaidMembership'];
  username: User['username'];
  firstName: User['firstName'];
  lastName: User['lastName'];
  email: User['email'];
  password: User['password'];
  birthday: User['birthday'];
  status?: User['status'];
  documents?: User['documents'];
  details?: User['details'];
  social?: User['social'];
}

export type ResultCreateUserUseCaseInterface = UserRecord;
export interface CreateUserUseCaseInterface {
  execute(
    data: CreateUserDataUseCaseInterface,
  ): Promise<ResultCreateUserUseCaseInterface>;
}
