import { Inject, Injectable } from '@nestjs/common';
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
  ) {}

  async execute(data: User): Promise<UserRecord> {
    return this.createUserRepository.create(data);
  }
}
