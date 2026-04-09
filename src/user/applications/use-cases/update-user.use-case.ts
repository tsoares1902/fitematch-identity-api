import { Inject, Injectable } from '@nestjs/common';
import type {
  UpdateUserDataUseCaseInterface,
  UpdateUserUseCaseInterface,
} from '@src/user/applications/contracts/update-user.use-case-interface';
import type { ResultUpdateUserUseCaseInterface } from '@src/user/applications/contracts/result-update-user.use-case.interface';
import {
  USER_COMMAND_REPOSITORY,
  type UserCommandRepository,
} from '@src/user/domains/repositories/user-command.repository';
import type { ReadUserOutputDto } from '@src/user/applications/contracts/result-read-user.use-case.interface';
import type { User } from '@src/user/domains/entities/user.entity';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<ResultUpdateUserUseCaseInterface> {
    const user = await this.userCommandRepository.update(id, {
      user: data,
    });

    if (!user) {
      throw new UserNotFoundError('User not found.');
    }

    return { data: this.toOutput(user) };
  }

  private toOutput(user: User): ReadUserOutputDto {
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
