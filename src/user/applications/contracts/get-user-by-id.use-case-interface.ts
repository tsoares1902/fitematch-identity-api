import type { UserRecord } from './user-record.interface';

export const GET_USER_BY_ID_USE_CASE = 'GET_USER_BY_ID_USE_CASE';

export interface GetUserByIdUseCaseInterface {
  execute(id: string): Promise<UserRecord>;
}
