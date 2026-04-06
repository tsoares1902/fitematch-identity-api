import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  READ_USER_REPOSITORY,
  type ReadUserRepositoryInterface,
} from '@src/user/applications/contracts/read-user.repository-interface';
import type { ReadUserUseCaseInterface } from '@src/user/applications/contracts/read-user.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@Injectable()
export class ReadUserUseCase implements ReadUserUseCaseInterface {
  constructor(
    @Inject(READ_USER_REPOSITORY)
    private readonly readUserRepository: ReadUserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<UserRecord> {
    const user = await this.readUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
