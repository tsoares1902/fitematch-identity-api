import { Inject, Injectable } from '@nestjs/common';
import {
  LIST_USERS_REPOSITORY,
  type ListUsersRepositoryInterface,
} from '@src/user/applications/contracts/list-users.repository-interface';
import type { ListUsersFilters } from '@src/user/applications/contracts/list-users-filters.interface';
import type { ListUsersUseCaseInterface } from '@src/user/applications/contracts/list-users.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@Injectable()
export class ListUsersUseCase implements ListUsersUseCaseInterface {
  constructor(
    @Inject(LIST_USERS_REPOSITORY)
    private readonly listUsersRepository: ListUsersRepositoryInterface,
  ) {}

  async execute(filters: ListUsersFilters): Promise<UserRecord[]> {
    return this.listUsersRepository.list(filters);
  }
}
