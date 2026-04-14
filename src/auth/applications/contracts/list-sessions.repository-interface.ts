import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';

export const LIST_SESSIONS_REPOSITORY_INTERFACE =
  'LIST_SESSIONS_REPOSITORY_INTERFACE';

export interface ListSessionsRepositoryInterface {
  findByUserId(userId: string): Promise<SessionRecordResponse[]>;
}
