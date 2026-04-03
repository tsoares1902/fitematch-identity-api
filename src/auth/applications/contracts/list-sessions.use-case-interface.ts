import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';

export const LIST_SESSIONS_USE_CASE = 'LIST_SESSIONS_USE_CASE';

export interface ListSessionsUseCaseInterface {
  execute(userId: string): Promise<SessionRecordResponse[]>;
}
