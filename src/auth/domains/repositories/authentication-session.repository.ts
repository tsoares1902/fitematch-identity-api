import type { User } from '@src/user/domains/entities/user.entity';

export const AUTHENTICATION_SESSION_REPOSITORY =
  'AUTHENTICATION_SESSION_REPOSITORY';

export interface AuthenticatedSessionIdentity {
  user: User;
  tokenVersion: number;
}

export interface AuthenticationSessionRepository {
  findIdentityById(
    userId: string,
  ): Promise<AuthenticatedSessionIdentity | null>;
  deactivateSession(
    userId: string,
    sessionId: string,
    updatedAt: Date,
  ): Promise<boolean>;
  incrementTokenVersion(userId: string): Promise<void>;
}
