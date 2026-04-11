import { Inject, Injectable } from '@nestjs/common';
import type {
  UpdateUserDataUseCaseInterface,
  UpdateUserUseCaseInterface,
} from '@src/user/applications/contracts/update-user.use-case-interface';
import type { ResultUpdateUserUseCaseInterface } from '@src/user/applications/contracts/result-update-user.use-case.interface';
import {
  UPDATE_USER_REPOSITORY,
  type UpdateUserRepositoryInterface,
} from '@src/user/applications/contracts/update-user.repository-interface';
import type { ReadUserOutputDto } from '@src/user/applications/contracts/result-read-user.use-case.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    @Inject(UPDATE_USER_REPOSITORY)
    private readonly updateUserRepository: UpdateUserRepositoryInterface,
  ) {}

  async execute(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<ResultUpdateUserUseCaseInterface> {
    const user = await this.updateUserRepository.update(id, data);

    if (!user) {
      throw new UserNotFoundError('User not found.');
    }

    return { data: this.toOutput(user) };
  }

  private toOutput(user: UserRecord): ReadUserOutputDto {
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
