import { Inject, Injectable } from '@nestjs/common';
import {
  LIST_USER_REPOSITORY,
  type ListUserRepositoryInterface,
} from '@src/user/applications/contracts/list-user.repository-interface';
import type { ListUserRequestInterface } from '@src/user/applications/contracts/list-user.request.interface';
import type { ListUsersUseCaseInterface } from '@src/user/applications/contracts/list-users.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@Injectable()
export class ListUsersUseCase implements ListUsersUseCaseInterface {
  constructor(
    @Inject(LIST_USER_REPOSITORY)
    private readonly listUserRepository: ListUserRepositoryInterface,
  ) {}

  async execute(filters: ListUserRequestInterface): Promise<UserRecord[]> {
    return this.listUserRepository.list(filters);
  }
}
