import { Inject, Injectable } from '@nestjs/common';
import type { ReadUserUseCaseInterface } from '@src/user/applications/contracts/read-user.use-case-interface';
import type {
  ReadUserOutputDto,
  ResultReadUserUseCaseInterface,
} from '@src/user/applications/contracts/result-read-user.use-case.interface';
import {
  USER_QUERY_REPOSITORY,
  type UserQueryRepository,
} from '@src/user/domains/repositories/user-query.repository';
import type { User } from '@src/user/domains/entities/user.entity';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';

@Injectable()
export class ReadUserUseCase implements ReadUserUseCaseInterface {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(id: string): Promise<ResultReadUserUseCaseInterface> {
    const user = await this.userQueryRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      data: this.toOutput(user),
    };
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
      accountVerifiedAt: user.accountVerifiedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
