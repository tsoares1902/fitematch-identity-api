import type { UserRecord } from './user-record.interface';

export const READ_USER_USE_CASE = 'READ_USER_USE_CASE';

export interface ReadUserUseCaseInterface {
  execute(id: string): Promise<UserRecord>;
}
