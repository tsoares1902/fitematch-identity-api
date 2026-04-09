import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  handleDuplicateKeyError,
  toLegacyUserRecord,
  toPersistenceWriteModel,
} from '@src/user/adapters/persistence/repositories/user-persistence.helpers';
import {
  type UserPersistenceDocument,
  UserPersistenceModel,
} from '@src/user/adapters/persistence/mongoose/user.persistence';
import type { CreateUserRepositoryInterface } from '@src/user/applications/contracts/create-user.repository-interface';
import type { DeleteUserRepositoryInterface } from '@src/user/applications/contracts/delete-user.repository-interface';
import type { UpdateUserRepositoryInterface } from '@src/user/applications/contracts/update-user.repository-interface';
import type { User } from '@src/user/applications/contracts/user.interface';
import type { UpdateUserDataUseCaseInterface } from '@src/user/applications/contracts/update-user.use-case-interface';
import type {
  CreateUserCommand,
  UpdateUserCommand,
  UserCommandRepository,
} from '@src/user/domains/repositories/user-command.repository';
import { toDomainUser } from '@src/user/adapters/persistence/mappers/user-persistence.mapper';
import { Model } from 'mongoose';

@Injectable()
export class UserCommandRepositoryAdapter
  implements
    CreateUserRepositoryInterface,
    UpdateUserRepositoryInterface,
    DeleteUserRepositoryInterface,
    UserCommandRepository
{
  constructor(
    @InjectModel(UserPersistenceModel.name)
    private readonly userModel: Model<UserPersistenceDocument>,
  ) {}

  async createUser(data: User) {
    try {
      const user = await this.userModel.create(toPersistenceWriteModel(data));
      return toLegacyUserRecord(user);
    } catch (error) {
      handleDuplicateKeyError(error);
      throw error;
    }
  }

  async create(command: CreateUserCommand) {
    try {
      const user = await this.userModel.create({
        ...command.user,
        ...toPersistenceWriteModel({}),
        firstName: command.user.firstName,
        lastName: command.user.lastName,
        email: command.user.email,
        birthday: command.user.birthday,
        status: command.user.status,
        productRole: command.user.productRole,
        adminRole: command.user.adminRole,
        permissions: command.user.permissions,
        isInternal: command.user.isInternal,
        candidateProfile: command.user.candidateProfile,
        recruiterProfile: command.user.recruiterProfile,
        emailVerifiedAt: command.user.emailVerifiedAt,
        createdBy: command.user.createdBy,
        lastLoginAt: command.user.lastLoginAt,
        suspendedAt: command.user.suspendedAt,
        suspendedReason: command.user.suspendedReason,
        deactivatedAt: command.user.deactivatedAt,
        deactivatedReason: command.user.deactivatedReason,
        bannedAt: command.user.bannedAt,
        bannedReason: command.user.bannedReason,
        password: command.passwordHash,
        tokenVersion: command.tokenVersion ?? 0,
      });

      return toDomainUser(user);
    } catch (error) {
      handleDuplicateKeyError(error);
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDataUseCaseInterface);
  async update(id: string, command: UpdateUserCommand);
  async update(
    id: string,
    data: UpdateUserDataUseCaseInterface | UpdateUserCommand,
  ) {
    const payload =
      'user' in data
        ? this.toDomainPersistenceWriteModel(data.user)
        : toPersistenceWriteModel(data);

    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, payload, {
          returnDocument: 'after',
          runValidators: true,
        })
        .exec();

      if (!user) {
        return null;
      }

      if ('user' in data) {
        return toDomainUser(user);
      }

      return toLegacyUserRecord(user);
    } catch (error) {
      handleDuplicateKeyError(error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    return this.deactivate(id);
  }

  async deactivate(id: string): Promise<boolean> {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'deactivated',
            deactivatedAt: new Date().toISOString(),
          },
        },
        { returnDocument: 'after' },
      )
      .exec();

    return Boolean(user);
  }

  private toDomainPersistenceWriteModel(
    user: UpdateUserCommand['user'],
  ): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        status: user.status,
        productRole: user.productRole,
        adminRole: user.adminRole,
        permissions: user.permissions,
        isInternal: user.isInternal,
        candidateProfile: user.candidateProfile,
        recruiterProfile: user.recruiterProfile,
        emailVerifiedAt: user.emailVerifiedAt,
        createdBy: user.createdBy,
        lastLoginAt: user.lastLoginAt,
        suspendedAt: user.suspendedAt,
        suspendedReason: user.suspendedReason,
        deactivatedAt: user.deactivatedAt,
        deactivatedReason: user.deactivatedReason,
        bannedAt: user.bannedAt,
        bannedReason: user.bannedReason,
      }).filter(([, value]) => value !== undefined),
    );
  }
}
