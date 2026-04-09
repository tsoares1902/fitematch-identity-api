export interface SessionRecordResponse {
  userId: string;
  sessionId: string;
  client?: {
    browser?: string;
    deviceType?: string;
    ip?: string;
    os?: string;
    timezone?: string;
    userAgent?: string;
  };
  active: boolean;
  createdAt: Date;
  startedAt: Date;
  updatedAt?: Date;
}
