import { Inject, Injectable } from '@nestjs/common';
import type { ListUserUseCaseInterface } from '@src/user/applications/contracts/list-user.use-case-interface';
import type {
  ListUsersOutputDto,
  ResultListUserUseCaseInterface,
} from '@src/user/applications/contracts/result-list-user.use-case.interface';
import type { ListUserQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
import {
  USER_QUERY_REPOSITORY,
  type UserQueryRepository,
} from '@src/user/domains/repositories/user-query.repository';
import type { User } from '@src/user/domains/entities/user.entity';
import { userToInterface } from '@src/user/applications/mappers/user-to-interface.mapper';

@Injectable()
export class ListUsersUseCase implements ListUserUseCaseInterface {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(
    filters: ListUserQueryInterface,
  ): Promise<ResultListUserUseCaseInterface> {
    // Ajustar o tipo do filtro status para UserStatusEnum se necessário
    const {
      data: users,
      totalItems,
      currentPage,
      itemsPerPage,
    } = await this.userQueryRepository.list(filters);

    // Converter todos os usuários para UserInterface
    const userInterfaces = users.map(userToInterface);

    return {
      data: userInterfaces,
      pagination: {
        totalItems,
        itemsPerPage,
        currentPage,
      },
    };
  }

  private toOutput(user: User): ListUsersOutputDto {
    return userToInterface(user);
  }
}
