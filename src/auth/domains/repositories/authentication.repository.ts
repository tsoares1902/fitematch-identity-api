import type { User } from '@src/user/domains/entities/user.entity';

export const AUTHENTICATION_REPOSITORY = 'AUTHENTICATION_REPOSITORY';

export interface AuthenticatedIdentity {
  user: User;
  passwordHash: string;
  tokenVersion: number;
}

export interface SessionClient {
  browser?: string;
  deviceType?: string;
  ip?: string;
  os?: string;
  timezone?: string;
  userAgent?: string;
}

export interface CreateAuthSession {
  userId: string;
  sessionId: string;
  client?: SessionClient;
  active: boolean;
  createdAt: Date;
  startedAt: Date;
  updatedAt?: Date;
}

export interface AuthenticationRepository {
  findIdentityByEmail(email: string): Promise<AuthenticatedIdentity | null>;
  createSession(session: CreateAuthSession): Promise<void>;
}
