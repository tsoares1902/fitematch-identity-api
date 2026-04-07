import type { UserRecord } from './user-record.interface';

export const READ_USER_REPOSITORY_INTERFACE = 'READ_USER_REPOSITORY_INTERFACE';

export interface ReadUserRepositoryInterface {
  findById(id: string): Promise<UserRecord | null>;
}
