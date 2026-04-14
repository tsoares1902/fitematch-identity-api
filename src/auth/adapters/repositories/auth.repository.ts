import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { ListSessionsRepositoryInterface } from '@src/auth/applications/contracts/list-sessions.repository-interface';
import {
  type LoginRepositoryInterface,
  type LoginUserRecord,
  type SessionRecord,
} from '@src/auth/applications/contracts/login.repository-interface';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';
import type {
  AccountRecoveryIdentity,
  AccountRecoveryRepository,
} from '@src/auth/domains/repositories/account-recovery.repository';
import type {
  AuthenticatedIdentity,
  AuthenticationRepository,
  CreateAuthSession,
} from '@src/auth/domains/repositories/authentication.repository';
import type {
  AuthenticatedSessionIdentity,
  AuthenticationSessionRepository,
} from '@src/auth/domains/repositories/authentication-session.repository';
import type {
  SessionQueryRepository,
  UserSession,
} from '@src/auth/domains/repositories/session-query.repository';
import {
  SessionEntity,
  type SessionDocument,
} from '@src/auth/domains/schemas/session.schema';
import {
  type UserPersistenceDocument,
  UserPersistenceModel,
} from '@src/user/adapters/persistence/mongoose/user.persistence';
import { toDomainUser } from '@src/user/adapters/persistence/mappers/user-persistence.mapper';
import {
  UserStatusEnum as DomainUserStatusEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository
  implements
    LoginRepositoryInterface,
    ListSessionsRepositoryInterface,
    AuthenticationRepository,
    AuthenticationSessionRepository,
    SessionQueryRepository,
    AccountRecoveryRepository
{
  constructor(
    @InjectModel(UserPersistenceModel.name)
    private readonly userModel: Model<UserPersistenceDocument>,
    @InjectModel(SessionEntity.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async findByEmail(email: string): Promise<LoginUserRecord | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null;
    }

    const domainUser = toDomainUser(user);
    return {
      ...domainUser,
      id: user._id.toString(),
      tokenVersion: user.tokenVersion ?? 0,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findRecoveryIdentityByEmail(
    email: string,
  ): Promise<AccountRecoveryIdentity | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null;
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      emailVerifiedAt: user.emailVerifiedAt,
    };
  }

  async findIdentityByEmail(
    email: string,
  ): Promise<AuthenticatedIdentity | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null;
    }

    return {
      user: toDomainUser(user),
      passwordHash: user.password,
      tokenVersion: user.tokenVersion ?? 0,
    };
  }

  async findById(id: string): Promise<LoginUserRecord | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return null;
    }

    const domainUser = toDomainUser(user);
    return {
      ...domainUser,
      id: user._id.toString(),
      tokenVersion: user.tokenVersion ?? 0,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findIdentityById(
    userId: string,
  ): Promise<AuthenticatedSessionIdentity | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      return null;
    }

    return {
      user: toDomainUser(user),
      tokenVersion: user.tokenVersion ?? 0,
    };
  }

  async incrementTokenVersion(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } })
      .exec();
  }

  async createSession(data: SessionRecord): Promise<void>;
  async createSession(data: CreateAuthSession): Promise<void>;
  async createSession(data: SessionRecord | CreateAuthSession): Promise<void> {
    await this.sessionModel.create(data);
  }

  async deactivateSession(
    userId: string,
    sessionId: string,
    updatedAt: Date,
  ): Promise<boolean> {
    const session = await this.sessionModel
      .findOneAndUpdate(
        { userId, sessionId, active: true },
        {
          $set: {
            active: false,
            updatedAt,
          },
        },
        {
          returnDocument: 'after',
        },
      )
      .exec();

    return Boolean(session);
  }

  async findByUserId(userId: string): Promise<SessionRecordResponse[]> {
    const sessions = await this.listByUserId(userId);

    return sessions.map((session) => ({
      userId: session.userId,
      sessionId: session.sessionId,
      client: session.client,
      active: session.active,
      createdAt: session.createdAt,
      startedAt: session.startedAt,
      updatedAt: session.updatedAt,
    }));
  }

  async listByUserId(userId: string): Promise<UserSession[]> {
    const sessions = await this.sessionModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return sessions.map((session) => ({
      userId: session.userId,
      sessionId: session.sessionId,
      client: session.client,
      active: session.active,
      createdAt: session.createdAt,
      startedAt: session.startedAt,
      updatedAt: session.updatedAt,
    }));
  }

  async storePasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.userModel
      .updateOne(
        { _id: userId },
        {
          $set: {
            passwordResetTokenHash: tokenHash,
            passwordResetExpiresAt: expiresAt,
          },
        },
      )
      .exec();
  }

  async storeEmailVerificationToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.userModel
      .updateOne(
        { _id: userId },
        {
          $set: {
            emailVerificationTokenHash: tokenHash,
            emailVerificationExpiresAt: expiresAt,
          },
        },
      )
      .exec();
  }

  async resetPassword(
    tokenHash: string,
    passwordHash: string,
    updatedAt: Date,
  ): Promise<boolean> {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          passwordResetTokenHash: tokenHash,
          passwordResetExpiresAt: { $gt: updatedAt },
        },
        {
          $set: {
            password: passwordHash,
            updatedAt,
          },
          $unset: {
            passwordResetTokenHash: 1,
            passwordResetExpiresAt: 1,
          },
          $inc: {
            tokenVersion: 1,
          },
        },
        {
          returnDocument: 'after',
        },
      )
      .exec();

    return Boolean(user);
  }

  async verifyEmail(tokenHash: string, verifiedAt: string): Promise<boolean> {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          emailVerificationTokenHash: tokenHash,
          emailVerificationExpiresAt: { $gt: new Date() },
        },
        {
          $set: {
            emailVerifiedAt: verifiedAt,
            status: 'active',
          },
          $unset: {
            emailVerificationTokenHash: 1,
            emailVerificationExpiresAt: 1,
          },
        },
        {
          returnDocument: 'after',
        },
      )
      .exec();

    return Boolean(user);
  }

  private toLegacyStatus(status?: DomainUserStatusEnum): UserStatusEnum {
    if ((status as string | undefined) === 'pending_account_confirmation') {
      return 'pending' as UserStatusEnum;
    }

    if ((status as string | undefined) === 'active') {
      return 'enabled' as UserStatusEnum;
    }

    return 'disabled' as UserStatusEnum;
  }
}
