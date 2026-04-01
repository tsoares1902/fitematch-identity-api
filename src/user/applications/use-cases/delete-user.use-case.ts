import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  DELETE_USER_REPOSITORY,
  type DeleteUserRepositoryInterface,
} from '@src/user/applications/contracts/delete-user.repository-interface';
import type { DeleteUserUseCaseInterface } from '@src/user/applications/contracts/delete-user.use-case-interface';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    @Inject(DELETE_USER_REPOSITORY)
    private readonly deleteUserRepository: DeleteUserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.deleteUserRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('User not found.');
    }

    return true;
  }
}
