import { Inject, Injectable } from '@nestjs/common';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import {
  CREATE_USER_REPOSITORY_INTERFACE,
  type CreateUserRepositoryInterface,
} from '@src/user/applications/contracts/create-user.repository-interface';
import type {
  CreateUserDataUseCaseInterface,
  CreateUserUseCaseInterface,
} from '@src/user/applications/contracts/create-user.use-case-interface';
import type { ResultCreateUserUseCaseInterface } from '@src/user/applications/contracts/result-create-user.use-case.interface';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  /* istanbul ignore next */
  constructor(
    @Inject(CREATE_USER_REPOSITORY_INTERFACE)
    private readonly createUserRepository: CreateUserRepositoryInterface,
    private readonly encryptUtils: EncryptUtils,
  ) {}

  async execute(
    data: CreateUserDataUseCaseInterface,
  ): Promise<ResultCreateUserUseCaseInterface> {
    const password = await this.encryptUtils.encryptPassword(data.password);
    const user = await this.createUserRepository.createUser({
      ...data,
      password,
      status: data.status ?? 'pending_account_confirmation',
    });
    return { data: user };
  }
}
