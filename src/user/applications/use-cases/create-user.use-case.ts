import { Inject, Injectable } from '@nestjs/common';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import {
  CREATE_USER_REPOSITORY,
  type CreateUserRepositoryInterface,
} from '@src/user/applications/contracts/create-user.repository-interface';
import type {
  CreateUserDataUseCaseInterface,
  CreateUserUseCaseInterface,
  ResultCreateUserUseCaseInterface,
} from '@src/user/applications/contracts/create-user.use-case-interface';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @Inject(CREATE_USER_REPOSITORY)
    private readonly createUserRepository: CreateUserRepositoryInterface,
    private readonly encryptUtils: EncryptUtils,
  ) {}

  async execute(
    data: CreateUserDataUseCaseInterface,
  ): Promise<ResultCreateUserUseCaseInterface> {
    const password = await this.encryptUtils.encryptPassword(data.password);

    return this.createUserRepository.createUser({
      ...data,
      isPaidMembership: data.isPaidMembership ?? false,
      password,
      status: data.status ?? UserStatusEnum.PENDING,
    });
  }
}
