import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';

export const LIST_SESSIONS_REPOSITORY = 'LIST_SESSIONS_REPOSITORY';

export interface ListSessionsRepositoryInterface {
  findByUserId(userId: string): Promise<SessionRecordResponse[]>;
}
