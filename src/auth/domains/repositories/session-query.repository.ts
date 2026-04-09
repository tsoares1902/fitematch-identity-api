export const SESSION_QUERY_REPOSITORY = 'SESSION_QUERY_REPOSITORY';

export interface SessionClientInfo {
  browser?: string;
  deviceType?: string;
  ip?: string;
  os?: string;
  timezone?: string;
  userAgent?: string;
}

export interface UserSession {
  userId: string;
  sessionId: string;
  client?: SessionClientInfo;
  active: boolean;
  createdAt: Date;
  startedAt: Date;
  updatedAt?: Date;
}

export interface SessionQueryRepository {
  listByUserId(userId: string): Promise<UserSession[]>;
}
