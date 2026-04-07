import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { CreateUserRepositoryInterface } from '@src/user/applications/contracts/create-user.repository-interface';
import type { DeleteUserRepositoryInterface } from '@src/user/applications/contracts/delete-user.repository-interface';
import type { User } from '@src/user/applications/contracts/user.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
import type { ReadUserRepositoryInterface } from '@src/user/applications/contracts/read-user.repository-interface';
import {
  type ListUserRepositoryInterface,
  type ListUserRepositoryResultInterface,
} from '@src/user/applications/contracts/list-user.repository-interface';
import type { ListUsersQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import type { UpdateUserRepositoryInterface } from '@src/user/applications/contracts/update-user.repository-interface';
import type { UpdateUserDataUseCaseInterface } from '@src/user/applications/contracts/update-user.use-case-interface';
import {
  UserEntity,
  type UserDocument,
} from '@src/user/domains/schemas/user.schema';
import { isValidObjectId, Model, type SortOrder } from 'mongoose';

@Injectable()
export class UserRepository
  implements
    ListUserRepositoryInterface,
    CreateUserRepositoryInterface,
    ReadUserRepositoryInterface,
    UpdateUserRepositoryInterface,
    DeleteUserRepositoryInterface
{
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: User): Promise<UserRecord> {
    try {
      const user = await this.userModel.create(data);

      return this.toRecord(user);
    } catch (error) {
      this.handleDuplicateKeyError(error);
      throw error;
    }
  }

  async list(
    filters: ListUsersQueryInterface,
  ): Promise<ListUserRepositoryResultInterface> {
    const page = Number(filters.page ?? 1);
    const limit = Number(filters.limit ?? 10);
    const skip = (page - 1) * limit;
    const query = this.buildListQuery(filters);

    const [users, totalItems] = await Promise.all([
      this.userModel
        .find(query)
        .sort(this.buildListSort(filters))
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);

    return {
      data: users.map((user) => this.toRecord(user)),
      totalItems,
      currentPage: page,
      itemsPerPage: limit,
    };
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toRecord(user) : null;
  }

  async update(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<UserRecord | null> {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, data, {
          returnDocument: 'after',
          runValidators: true,
        })
        .exec();

      return user ? this.toRecord(user) : null;
    } catch (error) {
      this.handleDuplicateKeyError(error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return Boolean(result);
  }

  private buildListQuery(
    filters: ListUsersQueryInterface,
  ): Record<string, unknown> {
    const query: Record<string, unknown> = {};

    if (filters.id !== undefined) {
      if (!isValidObjectId(filters.id)) {
        query._id = null;
        return query;
      }

      query._id = filters.id;
    }

    const searchableFields = ['firstName', 'lastName', 'email'] as const;

    for (const field of searchableFields) {
      const value = filters[field];

      if (value !== undefined) {
        query[field] = { $regex: value, $options: 'i' };
      }
    }

    if (filters.status !== undefined) {
      query.status = filters.status;
    }

    if (filters.role !== undefined) {
      query.role = filters.role;
    }

    return query;
  }

  private buildListSort(
    filters: ListUsersQueryInterface,
  ): Record<string, SortOrder> {
    const sortField = filters.sortBy ?? 'createdAt';
    const sortOrder: SortOrder = filters.sortOrder === 'asc' ? 1 : -1;

    return { [sortField]: sortOrder };
  }

  private handleDuplicateKeyError(error: unknown): void {
    if (
      typeof error !== 'object' ||
      error === null ||
      !('code' in error) ||
      error.code !== 11000
    ) {
      return;
    }

    const duplicatedFields =
      'keyPattern' in error &&
      typeof error.keyPattern === 'object' &&
      error.keyPattern !== null
        ? Object.keys(error.keyPattern)
        : [];

    if (duplicatedFields.includes('email')) {
      throw new ConflictException('email already exists');
    }

    throw new ConflictException('duplicate unique field');
  }

  private toRecord(document: UserDocument): UserRecord {
    return {
      id: document._id.toString(),
      role: document.role,
      isPaidMembership: document.isPaidMembership,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      status: document.status,
      birthday: document.birthday,
      documents: document.documents ?? {},
      details: document.details ?? {},
      social: document.social ?? {},
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
