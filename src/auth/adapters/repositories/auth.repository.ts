import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { ListSessionsRepositoryInterface } from '@src/auth/applications/contracts/list-sessions.repository-interface';
import {
  type LoginRepositoryInterface,
  type LoginUserRecord,
  type SessionRecord,
} from '@src/auth/applications/contracts/login.repository-interface';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';
import {
  SessionEntity,
  type SessionDocument,
} from '@src/auth/domains/schemas/session.schema';
import {
  UserEntity,
  type UserDocument,
} from '@src/user/domains/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository
  implements LoginRepositoryInterface, ListSessionsRepositoryInterface
{
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(SessionEntity.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async findByEmail(email: string): Promise<LoginUserRecord | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      role: user.role,
      isPaidMembership: user.isPaidMembership,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      tokenVersion: user.tokenVersion ?? 0,
      birthday: user.birthday,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findById(id: string): Promise<LoginUserRecord | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      role: user.role,
      isPaidMembership: user.isPaidMembership,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      tokenVersion: user.tokenVersion ?? 0,
      birthday: user.birthday,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async incrementTokenVersion(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } })
      .exec();
  }

  async createSession(data: SessionRecord): Promise<void> {
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
}
