import { Inject, Injectable } from '@nestjs/common';
import type { DeleteUserUseCaseInterface } from '@src/user/applications/contracts/delete-user.use-case-interface';
import type { ResultDeleteUserUseCaseInterface } from '@src/user/applications/contracts/result-delete-user.use-case.interface';
import {
  USER_COMMAND_REPOSITORY,
  type UserCommandRepository,
} from '@src/user/domains/repositories/user-command.repository';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
  ) {}

  async execute(id: string): Promise<ResultDeleteUserUseCaseInterface> {
    const deleted = await this.userCommandRepository.deactivate(id);

    if (!deleted) {
      throw new UserNotFoundError('User not found.');
    }

    return { success: true };
  }
}
