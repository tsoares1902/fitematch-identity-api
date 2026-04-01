import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { CreateUserRepositoryInterface } from '@src/user/applications/contracts/create-user.repository-interface';
import type { DeleteUserRepositoryInterface } from '@src/user/applications/contracts/delete-user.repository-interface';
import type { User } from '@src/user/applications/contracts/user.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
import type { GetUserByIdRepositoryInterface } from '@src/user/applications/contracts/get-user-by-id.repository-interface';
import type { ListUsersFilters } from '@src/user/applications/contracts/list-users-filters.interface';
import type { ListUsersRepositoryInterface } from '@src/user/applications/contracts/list-users.repository-interface';
import type { UpdateUserRepositoryInterface } from '@src/user/applications/contracts/update-user.repository-interface';
import {
  UserEntity,
  type UserDocument,
} from '@src/user/domains/schemas/user.schema';
import { isValidObjectId, Model, type SortOrder } from 'mongoose';

@Injectable()
export class UserRepository
  implements
    CreateUserRepositoryInterface,
    ListUsersRepositoryInterface,
    GetUserByIdRepositoryInterface,
    UpdateUserRepositoryInterface,
    DeleteUserRepositoryInterface
{
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: User): Promise<UserRecord> {
    try {
      const user = await this.userModel.create(data);

      return this.toRecord(user);
    } catch (error) {
      this.handleDuplicateKeyError(error);
      throw error;
    }
  }

  async list(filters: ListUsersFilters): Promise<UserRecord[]> {
    const query = this.buildListQuery(filters);
    const sort = this.buildListSort(filters);
    const users = await this.userModel.find(query).sort(sort).exec();

    return users.map((user) => this.toRecord(user));
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toRecord(user) : null;
  }

  async update(id: string, data: Partial<User>): Promise<UserRecord | null> {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, data, { new: true, runValidators: true })
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

  private buildListQuery(filters: ListUsersFilters): Record<string, unknown> {
    const query: Record<string, unknown> = {};

    if (filters.id !== undefined) {
      if (!isValidObjectId(filters.id)) {
        query._id = null;
        return query;
      }

      query._id = filters.id;
    }

    const searchableFields = [
      'username',
      'firstName',
      'lastName',
      'email',
    ] as const;

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

  private buildListSort(filters: ListUsersFilters): Record<string, SortOrder> {
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

    if (duplicatedFields.includes('username')) {
      throw new ConflictException('username already exists');
    }

    if (duplicatedFields.includes('email')) {
      throw new ConflictException('email already exists');
    }

    throw new ConflictException('duplicate unique field');
  }

  private toRecord(document: UserDocument): UserRecord {
    return {
      id: document._id.toString(),
      role: document.role,
      username: document.username,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      status: document.status,
      birthday: document.birthday,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
