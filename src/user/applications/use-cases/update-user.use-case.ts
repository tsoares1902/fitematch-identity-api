import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UPDATE_USER_REPOSITORY,
  type UpdateUserRepositoryInterface,
} from '@src/user/applications/contracts/update-user.repository-interface';
import type { UpdateUserUseCaseInterface } from '@src/user/applications/contracts/update-user.use-case-interface';
import type { User } from '@src/user/applications/contracts/user.interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    @Inject(UPDATE_USER_REPOSITORY)
    private readonly updateUserRepository: UpdateUserRepositoryInterface,
  ) {}

  async execute(id: string, data: Partial<User>): Promise<UserRecord> {
    const user = await this.updateUserRepository.update(id, data);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
