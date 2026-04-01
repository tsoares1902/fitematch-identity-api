import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GET_USER_BY_ID_REPOSITORY,
  type GetUserByIdRepositoryInterface,
} from '@src/user/applications/contracts/get-user-by-id.repository-interface';
import type { GetUserByIdUseCaseInterface } from '@src/user/applications/contracts/get-user-by-id.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  constructor(
    @Inject(GET_USER_BY_ID_REPOSITORY)
    private readonly getUserByIdRepository: GetUserByIdRepositoryInterface,
  ) {}

  async execute(id: string): Promise<UserRecord> {
    const user = await this.getUserByIdRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
