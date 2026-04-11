import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  type UserPersistenceDocument,
  UserPersistenceModel,
} from '@src/user/adapters/persistence/mongoose/user.persistence';
import type {
  ListUserRepositoryInterface,
  ListUserRepositoryResultInterface,
} from '@src/user/applications/contracts/list-user.repository-interface';
import type { ListUserQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import type { ReadUserRepositoryInterface } from '@src/user/applications/contracts/read-user.repository-interface';
import type {
  UserQueryFilters,
  UserQueryResult,
} from '@src/user/domains/repositories/user-query.repository';
import { toDomainUser } from '@src/user/adapters/persistence/mappers/user-persistence.mapper';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UserQueryRepositoryAdapter
  implements ListUserRepositoryInterface, ReadUserRepositoryInterface
{
  constructor(
    @InjectModel(UserPersistenceModel.name)
    private readonly userModel: Model<UserPersistenceDocument>,
  ) {}

  async list(
    filters: ListUserQueryInterface,
  ): Promise<ListUserRepositoryResultInterface>;
  async list(filters: UserQueryFilters): Promise<UserQueryResult>;
  async list(
    filters: ListUserQueryInterface | UserQueryFilters,
  ): Promise<ListUserRepositoryResultInterface | UserQueryResult> {
    const page = Number(filters.page ?? 1);
    const limit = Number(filters.limit ?? 10);
    const skip = (page - 1) * limit;
    const query = this.buildQuery(filters);
    const sort: Record<string, 1 | -1> = {
      [filters.sortBy ?? 'createdAt']: filters.sortOrder === 'asc' ? 1 : -1,
    };

    const [users, totalItems] = await Promise.all([
      this.userModel.find(query).sort(sort).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(query).exec(),
    ]);

    return {
      data: users.map((user) => toDomainUser(user)),
      totalItems,
      currentPage: page,
      itemsPerPage: limit,
    };
  }

  async findById(
    id: string,
  ): Promise<
    | import('@src/user/applications/contracts/user-record.interface').UserRecord
    | null
  > {
    const user = await this.userModel.findById(id).exec();
    return user ? toDomainUser(user) : null;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? toDomainUser(user) : null;
  }

  private buildQuery(
    filters: ListUserQueryInterface | UserQueryFilters,
  ): Record<string, unknown> {
    const query: Record<string, unknown> = {};

    if (filters.id !== undefined) {
      if (!isValidObjectId(filters.id)) {
        return { _id: null };
      }

      query._id = filters.id;
    }

    if (filters.email !== undefined) {
      query.email = filters.email;
    }

    if (filters.firstName !== undefined) {
      query.firstName = { $regex: filters.firstName, $options: 'i' };
    }

    if (filters.lastName !== undefined) {
      query.lastName = { $regex: filters.lastName, $options: 'i' };
    }

    if (filters.status !== undefined) {
      query.status = filters.status;
    }

    if (filters.isInternal !== undefined) {
      query.isInternal = filters.isInternal;
    }

    if (filters.productRole !== undefined) {
      query.productRole = filters.productRole;
    }

    return query;
  }
}
