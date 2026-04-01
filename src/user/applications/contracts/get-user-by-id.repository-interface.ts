import type { UserRecord } from './user-record.interface';

export const GET_USER_BY_ID_REPOSITORY = 'GET_USER_BY_ID_REPOSITORY';

export interface GetUserByIdRepositoryInterface {
  findById(id: string): Promise<UserRecord | null>;
}
