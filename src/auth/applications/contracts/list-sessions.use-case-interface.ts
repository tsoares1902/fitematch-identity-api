import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';

export const LIST_SESSIONS_USE_CASE_INTERFACE =
  'LIST_SESSIONS_USE_CASE_INTERFACE';

export interface ListSessionsUseCaseInterface {
  execute(userId: string): Promise<SessionRecordResponse[]>;
}
