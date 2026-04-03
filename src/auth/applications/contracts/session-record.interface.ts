import type { UserAgentInterface } from '@src/auth/applications/contracts/login.repository-interface';

export interface SessionRecordResponse {
  userId: string;
  sessionId: string;
  client?: UserAgentInterface;
  active: boolean;
  createdAt: Date;
  startedAt: Date;
  updatedAt?: Date;
}
