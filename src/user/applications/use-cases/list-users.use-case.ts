import { Inject, Injectable } from '@nestjs/common';
import type { ListUsersUseCaseInterface } from '@src/user/applications/contracts/list-user.use-case-interface';
import type {
  ListUsersOutputDto,
  ResultListUserUseCaseInterface,
} from '@src/user/applications/contracts/result-list-user.use-case.interface';
import type { ListUserQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import {
  USER_QUERY_REPOSITORY,
  type UserQueryRepository,
} from '@src/user/domains/repositories/user-query.repository';
import type { User } from '@src/user/domains/entities/user.entity';

@Injectable()
export class ListUsersUseCase implements ListUsersUseCaseInterface {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(
    filters: ListUserQueryInterface,
  ): Promise<ResultListUserUseCaseInterface> {
    const {
      data: users,
      totalItems,
      currentPage,
      itemsPerPage,
    } = await this.userQueryRepository.list(filters);

    return {
      data: users.map((user) => this.toOutput(user)),
      pagination: {
        totalItems,
        itemCount: users.length,
        itemsPerPage,
        totalPages: totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0,
        currentPage,
      },
    };
  }

  private toOutput(user: User): ListUsersOutputDto {
    return {
      id: user.id,
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
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
