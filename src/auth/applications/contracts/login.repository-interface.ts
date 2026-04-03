import type { CreateSessionDto } from '@src/auth/adapters/dto/create-session.dto';
import type { User } from '@src/user/applications/contracts/user.interface';

export const LOGIN_REPOSITORY = 'LOGIN_REPOSITORY';

export interface LoginUserRecord extends User {
  id: string;
  tokenVersion: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAgentInterface {
  browser?: string;
  deviceType?: string;
  ip?: string;
  os?: string;
  timezone?: string;
  userAgent?: string;
}

export type SessionRecord = CreateSessionDto;

export interface LoginRepositoryInterface {
  findByEmail(email: string): Promise<LoginUserRecord | null>;
  findById(id: string): Promise<LoginUserRecord | null>;
  incrementTokenVersion(userId: string): Promise<void>;
  createSession(data: SessionRecord): Promise<void>;
  deactivateSession(
    userId: string,
    sessionId: string,
    updatedAt: Date,
  ): Promise<boolean>;
}
