import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { toPersistenceWriteModel } from '@src/user/adapters/persistence/repositories/user-persistence.helpers';
import {
  type UserPersistenceDocument,
  UserPersistenceModel,
} from '@src/user/adapters/persistence/mongoose/user.persistence';
import type { CreateUserRepositoryInterface } from '@src/user/applications/contracts/create-user.repository-interface';
import type { DeleteUserRepositoryInterface } from '@src/user/applications/contracts/delete-user.repository-interface';
import type { UpdateUserRepositoryInterface } from '@src/user/applications/contracts/update-user.repository-interface';
import type { UpdateUserDataUseCaseInterface } from '@src/user/applications/contracts/update-user.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
// imports removidos pois não são mais usados
// Interfaces do domínio removidas, só use-case
import { toDomainUser } from '@src/user/adapters/persistence/mappers/user-persistence.mapper';
import type {
  UserCommandRepository,
  UpdateUserCommand,
} from '@src/user/domains/repositories/user-command.repository';
import type { User } from '@src/user/domains/entities/user.entity';
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

  async createUser(
    data: import('@src/user/applications/contracts/create-user.use-case-interface').CreateUserDataUseCaseInterface,
  ): Promise<
    import('@src/user/applications/contracts/user-record.interface').UserRecord
  > {
    const user = await this.userModel.create(toPersistenceWriteModel(data));
    return toDomainUser(
      user,
    ) as import('@src/user/applications/contracts/user-record.interface').UserRecord;
  }

  // Método create do domínio removido, só use-case

  async update(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<UserRecord | null>;
  async update(id: string, command: UpdateUserCommand): Promise<User | null>;
  async update(
    id: string,
    dataOrCommand: UpdateUserDataUseCaseInterface | UpdateUserCommand,
  ): Promise<UserRecord | User | null> {
    const payload = toPersistenceWriteModel(
      'user' in dataOrCommand ? dataOrCommand.user : dataOrCommand,
    );
    const user = await this.userModel
      .findByIdAndUpdate(id, payload, {
        returnDocument: 'after',
        runValidators: true,
      })
      .exec();

    if (!user) {
      return null;
    }

    return toDomainUser(user);
  }
  async create(
    command: import('@src/user/domains/repositories/user-command.repository').CreateUserCommand,
  ): Promise<User> {
    const user = await this.userModel.create({
      ...command.user,
      password: command.passwordHash,
      tokenVersion: command.tokenVersion ?? 0,
    });
    return toDomainUser(user);
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
}
