import { Inject, Injectable } from '@nestjs/common';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import {
  CREATE_USER_REPOSITORY,
  type CreateUserRepositoryInterface,
} from '@src/user/applications/contracts/create-user.repository-interface';
import type { CreateUserUseCaseInterface } from '@src/user/applications/contracts/create-user.use-case-interface';
import type { User } from '@src/user/applications/contracts/user.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @Inject(CREATE_USER_REPOSITORY)
    private readonly createUserRepository: CreateUserRepositoryInterface,
    private readonly encryptUtils: EncryptUtils,
  ) {}

  async execute(data: User): Promise<UserRecord> {
    const password = await this.encryptUtils.encryptPassword(data.password);

    return this.createUserRepository.create({
      ...data,
      password,
    });
  }
}
