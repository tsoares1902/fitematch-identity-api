import type { UserRecord } from './user-record.interface';

export const READ_USER_REPOSITORY = 'READ_USER_REPOSITORY';

export interface ReadUserRepositoryInterface {
  findById(id: string): Promise<UserRecord | null>;
}
